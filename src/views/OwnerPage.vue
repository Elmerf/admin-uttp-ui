<template>
  <v-container fluid>
    <app-heading :title="`Data Pemilik / ${this.owner.Nama}`"></app-heading>
    <v-row>
      <v-col v-for="(item, key) in this.owner" :key="key">
        <v-card>
          <v-card-title>{{ key }}</v-card-title>
          <v-card-text>{{ item }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <data-table :header="headers" type="ownerPage"></data-table>
  </v-container>
</template>

<script>
import AppHeading from "../components/AppHeading.vue";
import DataTable from "../components/DataTable.vue";

export default {
  components: { AppHeading, DataTable },
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
      ],
      data: "",
    };
  },
  computed: {
    owner() {
      const { nama, nik, jumlah_uttp, createdAt } =
        this.$route.params.ownerData;
      return {
        Nama: nama,
        NIK: nik,
        "Jumlah UTTP": jumlah_uttp,
        Terdaftar: createdAt,
      };
    },
  },
  mounted() {
    this.axios(`/api/data-uttps/${this.owner.NIK}`).then((res) => {
      this.data = res.data.data_uttps;
      this.$store.commit("addOwnerDataUTTP", this.data);
    });
  },
};
</script>

<style></style>
