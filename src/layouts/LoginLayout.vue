<template>
  <v-container fluid fill-height>
    <router-view @showError="showAlert"></router-view>
    <snack-bar
      color="alert"
      :show="show"
      :text="text"
      @toggleShow="(value) => (show = value)"
    ></snack-bar>
  </v-container>
</template>

<script>
const SnackBar = () => import("../components/SnackBar.vue");

export default {
  data: () => ({
    show: false,
    text: "",
  }),
  components: { SnackBar },
  methods: {
    showAlert(message) {
      this.show = true;
      this.text = message;
    },
  },
};
</script>

<style></style>
