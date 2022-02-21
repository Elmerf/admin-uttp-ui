<template>
  <div>
    <v-expand-transition>
      <v-card :width="width" v-show="toggle">
        <v-form val ref="form" class="px-6 mt-2 mb-4" v-model="valid">
          <v-text-field
            v-model="nik"
            :counter="16"
            :rules="nikRules"
            label="NIK"
            validate-on-blur
            required
          >
          </v-text-field>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nama Pemilik"
            validate-on-blurs
            required
          >
          </v-text-field>
          <v-btn
            class="mr-2 red darken-1 elevation-1"
            :disabled="!valid"
            @click="submitForm"
            >Submit <v-icon right>mdi-send</v-icon></v-btn
          >
          <v-btn class="ma-2 primary elevation-1" @click="toggleVisible"
            >Cancel</v-btn
          >
        </v-form>
      </v-card>
    </v-expand-transition>
    <snack-bar
      text="Berhasil menambahkan data pemilik"
      color="success"
      :show="showSnackbar"
    ></snack-bar>
  </div>
</template>

<script>
import SnackBar from "./SnackBar.vue";

export default {
  components: { SnackBar },
  data() {
    return {
      valid: false,
      nik: "",
      nikRules: [
        (v) => !!v || "NIK diperlukan",
        (v) => v.length === 16 || "NIK harus berjumlah 16 digit",
        (v) => /^\d+$/.test(v) || "NIK hanya menggunakan angka",
      ],
      name: "",
      nameRules: [(v) => !!v || "Nama diperlukan"],
      showSnackbar: false,
    };
  },
  computed: {
    toggle: {
      get() {
        return this.$store.state.ownerFormVisible;
      },
      set(toggle) {
        return toggle;
      },
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "100%";
        case "md":
          return "33%";
        case "lg":
          return "33%";
        case "xl":
          return "33%";
        default:
          return "50%";
      }
    },
  },
  methods: {
    toggleVisible() {
      this.$store.commit("toggleOwnerVisibility");

      this.$refs.form.reset();
    },
    submitForm() {
      this.$refs.form.validate();

      if (this.valid) {
        this.axios
          .post("http://192.168.1.9:3000/api/owners", {
            nama: this.name,
            nik: this.nik,
          })
          .then((res) => {
            if (res.status === 200) {
              this.showSnackbar = true;

              this.$refs.form.reset();
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style></style>
