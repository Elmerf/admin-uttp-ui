<template>
  <v-btn class="my-2 red darken-1" elevation="6" @click="visible(formType)"
    >Tambah <v-icon aria-hidden="false" right>mdi-plus-circle</v-icon></v-btn
  >
</template>

<script>
export default {
  name: "AddButton",
  props: {
    formType: String,
  },
  methods: {
    visible(form) {
      if (form === "owner" && !this.$store.state.ownerFormVisible) {
        this.$store.commit("toggleOwnerVisibility");
      }
      this.$emit("visible");
    },
  },
};
</script>

<style></style>
