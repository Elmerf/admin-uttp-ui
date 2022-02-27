<template>
  <v-container fluid>
    <app-heading title="Pemilik UTTP"></app-heading>
    <div>
      <add-button formType="owner"></add-button>
      <owners-form @dataIsCleared="dataIsEmpty = true"></owners-form>
    </div>
    <v-divider></v-divider>
    <data-table
      :header="headers"
      :isEmpty="dataIsEmpty"
      title="Semua Pemilik UTTP"
      type="owner"
    ></data-table>
  </v-container>
</template>

<script>
const AddButton = () => import("../components/AddButton.vue");
const AppHeading = () => import("../components/AppHeading.vue");
const DataTable = () => import("../components/DataTable.vue");
const OwnersForm = () => import("../components/OwnersForm.vue");

import moment from "moment";

export default {
  name: "OwnerView",
  data: () => {
    return {
      headers: [
        {
          text: "Nama",
          value: "nama",
          sortable: true,
          align: "start",
        },
        {
          text: "NIK",
          value: "nik",
          align: "center",
        },
        {
          text: "Terdaftar",
          value: "createdAt",
          align: "center",
        },
        {
          text: "Jumlah UTTP",
          value: "jumlah_uttp",
          align: "center",
        },
        {
          text: "Actions",
          value: "action",
          align: "center",
        },
      ],
      data: [],
      dataIsEmpty: false,
    };
  },
  components: {
    AppHeading,
    AddButton,
    DataTable,
    OwnersForm,
  },
  mounted() {
    if (!this.$store.state.ownersData.length) {
      this.axios
        .get("/api/owners")
        .then((res) => {
          if (!res.data.length) this.dataIsEmpty = true;
          this.data = res.data.map((el) => {
            let localeDate = moment(el.createdAt).locale("id").format("LL");
            return {
              ...el,
              createdAt: localeDate,
            };
          });
          this.$store.commit("addOwners", this.data);
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>
