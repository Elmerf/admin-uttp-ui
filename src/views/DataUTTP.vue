const newLocal='../components/DataTable.vue';
<template>
  <v-container>
    <app-heading title="Data UTTP"></app-heading>
    <data-table
      title="Semua Data UTTP"
      type="dataUTTP"
      :header="headers"
      :isEmpty="isEmpty"
      :showExpand="true"
    ></data-table>
  </v-container>
</template>

<script>
const DataTable = () => import("../components/DataTable.vue");
const AppHeading = () => import("../components/AppHeading.vue");
export default {
  components: { AppHeading, DataTable },
  data: () => ({
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
    ],
    isEmpty: false,
  }),
  mounted() {
    if (!this.$store.state.dataUTTPs.length) {
      this.axios.get("/api/data-uttps").then((res) => {
        if (!res.data.length) this.isEmpty = true;
        this.$store.commit("addDataUTTP", res.data);
      });
    }
  },
  beforeDestroy() {
    this.$store.commit("emptyDataUTTP");
  },
};
</script>

<style></style>
