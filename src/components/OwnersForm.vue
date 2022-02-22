<template>
  <div>
    <v-expand-transition>
      <v-card :width="width" v-show="toggle">
        <v-form val ref="form" class="px-6 mt-2 mb-6" v-model="valid">
          <v-text-field
            dense
            outlined
            v-model="nik"
            :counter="16"
            :rules="nikRules"
            label="NIK"
            validate-on-blur
            required
            color="orange darken-2"
            class="pt-6"
          >
          </v-text-field>
          <v-text-field
            dense
            outlined
            v-model="name"
            :rules="nameRules"
            label="Nama Pemilik"
            validate-on-blurs
            required
            color="orange darken-2"
          >
          </v-text-field>
          <v-row>
            <v-col>
              <v-btn
                class="red darken-1 elevation-1"
                :disabled="!valid"
                @click="submitForm"
                block
                >Submit <v-icon right>mdi-send</v-icon></v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                class="orange darken-1 elevation-1"
                @click="toggleVisible"
                block
                >Cancel <v-icon right>mdi-close-circle</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-expand-transition>
    <snack-bar
      :text="text"
      :color="color"
      :show="showSnackbar"
      @toggleShow="toggleSnackbar"
    ></snack-bar>
    <v-dialog v-model="showEditDialog" persistent :width="width">
      <v-card>
        <v-card-title>Ubah Data Pemilik</v-card-title>
        <v-card-text>
          <v-form val ref="formEdit" v-model="editValid">
            <v-text-field
              dense
              outlined
              v-model="editItem.nik"
              :counter="16"
              :rules="nikRules"
              label="NIK"
              validate-on-blur
              required
              color="orange darken-2"
              class="pt-6"
            >
            </v-text-field>
            <v-text-field
              dense
              outlined
              v-model="editItem.nama"
              :rules="nameRules"
              label="Nama Pemilik"
              validate-on-blurs
              required
              color="orange darken-2"
            >
            </v-text-field>
            <v-row>
              <v-col>
                <v-btn
                  class="red darken-1 elevation-1"
                  :disabled="!editValid"
                  @click="editOwner"
                  block
                  >Ubah <v-icon right>mdi-check-outline</v-icon></v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  class="orange darken-1 elevation-1"
                  @click="closeForm"
                  block
                  >Cancel <v-icon right>mdi-close-circle</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDeleteDialog" persistent :width="width">
      <v-card>
        <v-card-title>Delete Confirmation</v-card-title>
        <v-card-text>
          Anda akan menghapus data dengan NIK
          <span class="font-weight-black"> {{ oldNik }}</span
          >, Lanjutkan?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteOwner"> Yes </v-btn>
          <v-btn color="orange darken-1" text @click="closeDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SnackBar from "./SnackBar.vue";
import moment from "moment";

export default {
  components: { SnackBar },
  data() {
    return {
      editValid: false,
      valid: false,
      nik: "",
      nikRules: [
        (v) => !!v || "NIK diperlukan",
        (v) => (v != null && v.length === 16) || "NIK harus berjumlah 16 digit",
        (v) => /^\d+$/.test(v) || "NIK hanya menggunakan angka",
      ],
      name: "",
      nameRules: [(v) => !!v || "Nama diperlukan"],
      showSnackbar: false,
      text: "",
      color: "",
    };
  },
  computed: {
    showEditDialog: {
      get() {
        return this.$store.state.editFormVisible;
      },
      set(toggle) {
        return toggle;
      },
    },
    showDeleteDialog: {
      get() {
        return this.$store.state.deleteDialogVisible;
      },
      set(toggle) {
        return toggle;
      },
    },
    toggle: {
      get() {
        return this.$store.state.ownerFormVisible;
      },
      set(toggle) {
        return toggle;
      },
    },
    editItem() {
      if (this.showEditDialog) {
        return this.$store.state.ownerEditItem;
      }

      return {};
    },
    oldNik() {
      if (this.showEditDialog || this.showDeleteDialog) {
        return this.$store.state.ownerOldNik;
      }

      return "";
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
    toggleSnackbar(value) {
      this.showSnackbar = value;
    },
    toggleVisible() {
      this.$store.commit("toggleOwnerVisibility");

      this.$refs.form.reset();
    },
    submitForm() {
      if (this.valid) {
        this.axios
          .post("/api/owners", {
            nama: this.name,
            nik: this.nik,
          })
          .then((res) => {
            if (res.status === 200) {
              this.showSnackbar = true;
              this.text = "Berhasil Menambahkan Data Pemilik";
              this.color = "success";

              this.$refs.form.reset();

              let localeDate = moment(res.data.createdAt)
                .locale("id")
                .format("LL");
              let data = {
                ...res.data,
                createdAt: localeDate,
              };

              this.$store.commit("addOwners", [data]);
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              this.showSnackbar = true;
              this.text = err.response.data.message;
              this.color = "alert";
            }
          });
      }
    },
    editOwner() {
      if (this.editValid) {
        const data = {
          nama: this.editItem.nama,
          nik: this.editItem.nik,
          updatedAt: () => moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        this.axios
          .put(`/api/owners/${this.oldNik}`, data)
          .then((res) => {
            this.showSnackbar = true;
            this.text = res.data.message;
            this.color = "success";

            this.$store.commit("editOwner", data);
            this.closeForm();
          })
          .catch((err) => {
            if (err.response.status === 500) {
              this.showSnackbar = true;
              this.text = err.response.data.message;
              this.color = "alert";
            }
          });
      }
    },
    deleteOwner() {
      this.axios.delete(`/api/owners/${this.oldNik}`).then((res) => {
        if (res.status === 200) {
          this.showSnackbar = true;
          this.text = res.data.message;
          this.color = "success";

          this.$store.commit("deleteOwner");
          this.closeDialog();
        }
      });
    },
    closeForm() {
      this.$store.commit("toggleEditFormVisibility", {});
    },
    closeDialog() {
      this.$store.commit("toggleDeleteDialog", "");
    },
  },
};
</script>

<style></style>
