<template>
  <v-container fluid>
    <app-heading :title="`Data Pemilik / ${$route.params.nik}`"></app-heading>
    {{ $route.params.ownerData }}
  </v-container>
</template>

<script>
import AppHeading from "../components/AppHeading.vue";

export default {
  components: { AppHeading },
};
</script>

<style></style>
