<template>
  <div>
    <add-button @visible="isVisible = true"></add-button>
    <v-expand-transition>
      <v-card :width="width" v-show="isVisible">
        <DataUTTPField
          :nik="nik"
          method="SUBMIT"
          @hideForm="(value) => (isVisible = value)"
          @showSnackbar="showAlert"
        />
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script>
const DataUTTPField = () => import("./DataUTTPField.vue");
const AddButton = () => import("./AddButton.vue");

export default {
  name: "DataUTTPForm",
  props: {
    nik: String,
  },
  components: { AddButton, DataUTTPField },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "70%";
        case "md":
          return "50%";
        default:
          return "50%";
      }
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    showAlert(value) {
      this.$emit("showSnackbar", value);
    },
  },
};
</script>

<style></style>
