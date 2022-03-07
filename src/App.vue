<template>
  <v-app id="app"><router-view></router-view></v-app>
</template>

<script>
export default {
  beforeCreate() {
    if (!localStorage.getItem("user-session")) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
