<template>
  <v-container fluid>
    <app-heading :title="`Data Pemilik / ${this.owner.Nama}`"></app-heading>
    <v-row class="mt-1">
      <v-col v-for="(item, key) in this.owner" :key="key" cols="12" md="3">
        <v-card height="100%">
          <v-card-title>{{ key }}</v-card-title>
          <v-card-text>{{ item }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <DataUTTPForm :nik="owner.NIK" />
    <v-divider></v-divider>
    <data-table
      :header="headers"
      :isEmpty="dataIsEmpty"
      title="Data UTTP"
      type="ownerPage"
    ></data-table>
  </v-container>
</template>

<script>
const DataUTTPForm = () => import("../components/DataUTTPForm.vue");
const AppHeading = () => import("../components/AppHeading.vue");
const DataTable = () => import("../components/DataTable.vue");

export default {
  components: { AppHeading, DataTable, DataUTTPForm },
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
};
</script>

<style></style>
