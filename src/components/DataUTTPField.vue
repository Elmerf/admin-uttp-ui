<template>
  <v-form val ref="form" class="px-6 mt-2 mb-6" v-model="isValid">
    <v-row class="py-2" dense>
      <v-col cols="6" class="pa-2">
        <v-text-field
          :rules="rules"
          color="orange darken-2"
          dense
          hide-details="auto"
          label="Lokasi"
          outlined
          required
          v-model="dataUTTP.lokasi"
        >
        </v-text-field>
      </v-col>
      <v-col cols="6" class="pa-2">
        <v-select
          :items="jenis"
          :rules="rules"
          color="orange darken-2"
          dense
          hide-details="auto"
          label="Jenis"
          outlined
          required
          v-model="dataUTTP.jenis"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row class="my-0" dense>
      <v-col cols="6" class="pa-2">
        <v-menu :close-on-content-click="false" v-model="datePicker">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="rules"
              @click:append="datePicker = true"
              append-icon="mdi-calendar-month"
              color="orange darken-1"
              dense
              hide-details="auto"
              label="Tanggal Tera"
              outlined
              readonly
              v-bind="attrs"
              v-model="dataUTTP.tanggal_tera"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            @input="datePicker = false"
            color="red darken-1"
            v-model="dataUTTP.tanggal_tera"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6" class="pa-2">
        <v-text-field
          :rules="retribusiRules"
          color="orange darken-2"
          dense
          hide-details="auto"
          label="Retribusi"
          outlined
          prefix="Rp"
          required
          v-model.number="dataUTTP.retribusi"
          type="number"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-textarea
      v-model="dataUTTP.keterangan"
      class="px-1 my-2"
      color="orange darken-1"
      dense
      height="100"
      hide-details="auto"
      label="Keterangan"
      no-resize
      outlined
    >
    </v-textarea>
    <v-row class="mt-0">
      <v-col lg="4">
        <v-btn
          :disabled="!isValid || loading"
          :loading="loading"
          @click="submitForm"
          block
          class="red darken-1 elevation-1"
          >{{ method === "SUBMIT" ? "SUBMIT" : "UBAH" }}
          <v-icon right>{{
            method === "SUBMIT" ? "mdi-send" : "mdi-check-outline"
          }}</v-icon></v-btn
        >
      </v-col>
      <v-col lg="4">
        <v-btn @click="cancelForm" block class="orange darken-1 elevation-1"
          >Close <v-icon right>mdi-close-circle</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    nik: String,
    method: String,
    dataEdit: Boolean,
  },
  data() {
    return {
      dataUTTP: {
        kode_uttp: "",
        jenis: "",
        keterangan: "",
        lokasi: "",
        retribusi: 0,
        tanggal_tera: "",
      },
      datePicker: false,
      loading: false,
      isValid: false,
      jenis: ["Digital", "Tradisional"],
      rules: [(v) => !!v || "Diperlukan"],
    };
  },
  computed: {
    retribusiRules() {
      const rule = [(v) => v >= 0 || "Nilai tidak dapat negatif"];
      rule.push(...this.rules);
      return rule;
    },
  },
  methods: {
    submitForm() {
      if (this.isValid && this.method === "SUBMIT") {
        this.loading = true;
        this.axios
          .post(`/api/data-uttps/${this.nik}`, this.dataUTTP)
          .then((res) => {
            this.loading = false;
            this.$refs.form.reset();

            const {
              kode_uttp,
              lokasi,
              jenis,
              tanggal_tera,
              retribusi,
              keterangan,
            } = res.data;
            const newData = {
              kode_uttp,
              lokasi,
              jenis,
              tanggal_tera,
              retribusi,
              keterangan,
            };
            this.$emit("showSnackbar", {
              color: "success",
              text: "Data UTTP has been added successfully",
              show: true,
              method: "INCREASE",
            });
            this.$store.commit("addOwnerDataUTTP", [newData]);
          })
          .catch((err) => {
            this.loading = false;
            this.$emit("showSnackbar", {
              color: "alert",
              text: err.response.data.message,
              show: true,
            });
          });
      } else if (this.isValid && this.method === "EDIT") {
        this.loading = true;
        const value = Object.assign({}, this.dataUTTP);

        this.axios
          .put(`/api/data-uttps/${this.dataUTTP.kode_uttp}`, value)
          .then((res) => {
            const index = this.$store.state.ownerDataUTTPs
              .map((e) => e.kode_uttp)
              .indexOf(this.dataUTTP.kode_uttp);

            this.$emit("showSnackbar", {
              color: "success",
              text: res.data.message,
              show: true,
            });
            this.$store.commit("editOwnerDataUTTP", { index, value });
            this.loading = false;
            this.$emit("hideForm", false);
            this.$refs.form.reset();
          })
          .catch((err) => {
            this.loading = false;
            this.$emit("showSnackbar", {
              color: "alert",
              text: err.response.data.message,
              show: true,
            });
          });
      }
    },
    cancelForm() {
      this.$emit("hideForm", false);
      this.$refs.form.reset();
    },
  },
  watch: {
    dataEdit: {
      immediate: true,
      handler(val) {
        if (val) {
          const {
            kode_uttp,
            lokasi,
            jenis,
            tanggal_tera,
            retribusi,
            keterangan,
          } = JSON.parse(localStorage.getItem("edit-data"));
          Object.assign(this.dataUTTP, {
            kode_uttp,
            lokasi,
            jenis,
            tanggal_tera,
            retribusi,
            keterangan,
          });
        }
      },
    },
  },
};
</script>

<style></style>
