<template>
  <v-container fluid>
    <app-heading title="Overview"></app-heading>
    <v-row class="mt-1">
      <v-col v-for="(item, i) in items" :key="i" :md="item.size.md">
        <v-card>
          <v-card-title class="justify-center" :class="item.color">{{
            item.title
          }}</v-card-title>
          <v-card-text class="text-center text-h3" :class="item.color">{{
            item.jumlah
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const AppHeading = () => import("../components/AppHeading.vue");

export default {
  name: "OverviewPage",
  components: { AppHeading },
  data: () => ({
    items: [
      { title: "Sudah Tera", jumlah: 0, size: { md: 3 }, color: "green--text" },
      {
        title: "Belum Tera",
        jumlah: 0,
        size: { md: 3 },
        color: "orange--text",
      },
      {
        title: "Tera Ulang",
        jumlah: 0,
        size: { md: 3 },
        color: "orange--text",
      },
      { title: "Total UTTP", jumlah: 0, size: { md: 3 } },
      {
        title: "Pemilik Usaha",
        jumlah: 0,
        size: { md: 3 },
        color: "green--text",
      },
      {
        title: "Estimasi Pendapatan Belum Masuk",
        jumlah: 0,
        size: { md: 6 },
        color: "orange--text",
      },
    ],
  }),
};
</script>

<style></style>
