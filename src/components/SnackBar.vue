<template>
  <v-snackbar v-model="toggleShow" :color="color" class="elevation-2" top
    >{{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="toggleShow = false"
        fab
        small
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    color: String,
    text: String,
    show: Boolean,
  },
  data: function () {
    return {
      toggleShow: this.show,
    };
  },
  watch: {
    show: function () {
      this.toggleShow = this.show;
    },
    toggleShow: function () {
      this.$emit("toggleShow", this.toggleShow);
    },
  },
};
</script>

<style></style>
