<template>
  <v-container fluid>
    <app-heading :title="`Data Pemilik / ${this.owner.Nama}`"></app-heading>
    <v-row class="mt-1">
      <v-col
        v-for="(item, key) in this.owner"
        :key="key"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card height="100%">
          <v-card-title>{{ key }}</v-card-title>
          <v-card-text>{{ item }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <DataUTTPForm :nik="owner.NIK" @showSnackbar="showSnackbarAlert" />
    <v-divider></v-divider>
    <data-table
      :header="headers"
      :isEmpty="dataIsEmpty"
      :showExpand="true"
      title="Data UTTP"
      type="ownerPage"
      @showEditForm="editFormVisible"
      @showDeleteDialog="deleteDialogVisible"
    ></data-table>
    <snack-bar
      :color.sync="showSnackbar.color"
      :text.sync="showSnackbar.text"
      :show.sync="showSnackbar.show"
      @toggleShow="toggleSnackbar"
    ></snack-bar>
    <v-dialog v-model="showDialog" persistent width="50%">
      <v-card>
        <v-card-title>Delete Confirmation</v-card-title>
        <v-card-text>
          Anda akan menghapus data dengan kode UTTP
          <span class="font-weight-black"> {{ kode_uttp }} </span>, Lanjutkan?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteDataUTTP"> Yes </v-btn>
          <v-btn color="orange darken-1" text @click="closeDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showForm" persistent width="50%">
      <v-card
        ><v-card-title class="pt-2 my-0"
          >Ubah Data UTTP
          <span class="ml-1 font-weight-black">{{
            kode_uttp
          }}</span></v-card-title
        >
        <DataUTTPField
          method="EDIT"
          :dataEdit="editData"
          @hideForm="(value) => (editData = value) || (showForm = value)"
          @showSnackbar="showSnackbarAlert"
      /></v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const DataUTTPField = () => import("../components/DataUTTPField.vue");
const AppHeading = () => import("../components/AppHeading.vue");
const DataTable = () => import("../components/DataTable.vue");
const DataUTTPForm = () => import("../components/DataUTTPForm.vue");
const SnackBar = () => import("../components/SnackBar.vue");

export default {
  components: { AppHeading, DataTable, DataUTTPForm, SnackBar, DataUTTPField },
  data() {
    return {
      headers: [
        {
          text: "Kode UTTP",
          value: "kode_uttp",
        },
        {
          text: "Lokasi",
          value: "lokasi",
        },
        {
          text: "Jenis",
          value: "jenis",
        },
        {
          text: "Tanggal tera",
          value: "tanggal_tera",
        },
        {
          text: "Retribusi",
          value: "retribusi",
        },
        {
          text: "Actions",
          value: "action",
        },
      ],
      data: "",
      dataIsEmpty: false,
      editData: false,
      showSnackbar: {
        color: "",
        text: "",
        show: false,
      },
      showDialog: false,
      showForm: false,
      kode_uttp: "",
    };
  },
  computed: {
    owner() {
      if (this.$route.params.ownerData !== undefined) {
        const { nama, nik, jumlah_uttp, createdAt } =
          this.$route.params.ownerData;
        return {
          Nama: nama,
          NIK: nik,
          "Jumlah UTTP": jumlah_uttp,
          Terdaftar: createdAt,
        };
      }

      if (sessionStorage.getItem(this.$route.params.nik))
        return JSON.parse(sessionStorage.getItem(this.$route.params.nik));

      return {
        Nama: "",
        NIK: "",
        "Jumlah UTTP": "",
        Terdaftar: "",
      };
    },
  },
  mounted() {
    if (!this.$store.state.ownerDataUTTPs.length) {
      this.axios(`/api/data-uttps/${this.owner.NIK}`).then((res) => {
        if (!res.data.length) this.dataIsEmpty = true;
        this.data = res.data.data_uttps;
        this.$store.commit("addOwnerDataUTTP", this.data);
      });
    }
  },
  beforeDestroy() {
    this.$store.commit("emptiedOwnerDataUTTP");
  },
  methods: {
    showSnackbarAlert(value) {
      Object.assign(this.showSnackbar, value);
      if (value.method === "DECREASE") this.decreaseDataCount();
      if (value.method === "INCREASE") this.increaseDataCount();
    },
    toggleSnackbar(value) {
      Object.assign(this.showSnackbar, { show: value });
    },
    increaseDataCount() {
      this.owner["Jumlah UTTP"] += 1;

      const index = this.$store.state.ownersData
        .map((e) => e.nik)
        .indexOf(this.$route.params.nik);

      this.$store.commit("increaseJumlahUTTP", index);
      if (sessionStorage.getItem(this.$route.params.nik)) {
        const data = JSON.parse(sessionStorage.getItem(this.$route.params.nik));
        data["Jumlah UTTP"] += 1;
        sessionStorage.setItem(this.$route.params.nik, JSON.stringify(data));
      }
    },
    decreaseDataCount() {
      this.owner["Jumlah UTTP"] -= 1;

      const index = this.$store.state.ownersData
        .map((e) => e.nik)
        .indexOf(this.$route.params.nik);

      this.$store.commit("decreaseJumlahUTTP", index);
      if (sessionStorage.getItem(this.$route.params.nik)) {
        const data = JSON.parse(sessionStorage.getItem(this.$route.params.nik));
        data["Jumlah UTTP"] -= 1;
        sessionStorage.setItem(this.$route.params.nik, JSON.stringify(data));
      }
    },
    deleteDialogVisible(item) {
      this.showDialog = true;
      this.kode_uttp = item.kode_uttp;
    },
    deleteDataUTTP() {
      const index = this.$store.state.ownerDataUTTPs
        .map((e) => e.kode_uttp)
        .indexOf(this.kode_uttp);

      this.axios
        .delete(`/api/data-uttps/${this.kode_uttp}`)
        .then((res) => {
          const alert = {
            color: "success",
            text: res.data.message,
            show: true,
            method: "DECREASE",
          };

          this.$store.commit("deleteOwnerDataUTTP", index);
          this.closeDialog();
          this.showSnackbarAlert(alert);
        })
        .catch((err) => {
          this.showSnackbarAlert({
            color: "alert",
            text: err.response.data.message,
            show: true,
          });
        });
    },
    closeDialog() {
      this.showDialog = false;
    },
    editFormVisible(value) {
      this.showForm = true;
      this.editData = true;
      this.kode_uttp = value.kode_uttp;

      localStorage.setItem("edit-data", JSON.stringify(value));
    },
  },
};
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
