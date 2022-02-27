<template>
  <v-container fluid>
    <app-heading title="Overview"></app-heading>
  </v-container>
</template>

<script>
const AppHeading = () => import("../components/AppHeading.vue");

export default {
  name: "OverviewPage",
  components: { AppHeading },
};
</script>

<style></style>
