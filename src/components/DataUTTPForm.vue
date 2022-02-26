<template>
  <div>
    <add-button @visible="isVisible = true"></add-button>
    <v-expand-transition>
      <v-card width="50%" v-show="isVisible">
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
                validate-on-blur
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
                :rules="rules"
                color="orange darken-2"
                dense
                hide-details="auto"
                label="Retribusi"
                outlined
                prefix="Rp"
                required
                v-model="dataUTTP.retribusi"
                validate-on-blur
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
                >Submit <v-icon right>mdi-send</v-icon></v-btn
              >
            </v-col>
            <v-col lg="4">
              <v-btn
                @click="isVisible = false"
                block
                class="orange darken-1 elevation-1"
                >Close <v-icon right>mdi-close-circle</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script>
import AddButton from "./AddButton.vue";

export default {
  name: "DataUTTPForm",
  props: {
    nik: String,
  },
  components: { AddButton },
  data() {
    return {
      dataUTTP: {
        jenis: "",
        keterangan: "T",
        lokasi: "",
        retribusi: "",
        tanggal_tera: "",
      },
      datePicker: false,
      loading: false,
      isValid: false,
      isVisible: false,
      jenis: ["Digital", "Tradisional"],
      rules: [(v) => !!v || "Diperlukan"],
    };
  },
  methods: {
    submitForm() {
      if (this.isValid) {
        this.loading = true;
        this.axios
          .post(`/api/data-uttps/${this.nik}`, this.dataUTTP)
          .then(() => {
            this.loading = false;
            // let newData;

            // const { kode_uttp, lokasi, jenis, tanggal_tera, keterangan } = res.data;
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style></style>
