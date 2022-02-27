<template>
  <v-container fluid>
    <app-heading title="Laporan"></app-heading>
  </v-container>
</template>

<script>
const AppHeading = () => import("../components/AppHeading.vue");

export default {
  name: "LaporanPage",
  components: { AppHeading },
};
</script>

<style></style>
