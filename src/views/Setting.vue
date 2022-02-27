<template>
  <v-container fluid>
    <app-heading title="Setting"></app-heading>
  </v-container>
</template>

<script>
const AppHeading = () => import("../components/AppHeading.vue");

export default {
  name: "SettingPage",
  components: { AppHeading },
};
</script>

<style></style>
