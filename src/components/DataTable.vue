<template>
  <v-card class="elevation-4 mt-4">
    <v-card-title>
      <v-row>
        <v-col>{{ title }}</v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            outlined
            dense
            color="orange darken-1"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="header"
      :items="data"
      :loading="!data.length && !emptyData"
      class="mx-4 row-pointer"
      :show-expand="showExpand"
      item-key="kode_uttp"
      @click:row="handleClick"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              color="orange darken-2"
              @click.stop="editForm(item)"
            >
              <v-icon medium> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              color="red darken-1"
              @click.stop="deleteDialog(item)"
            >
              <v-icon medium> mdi-delete </v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          {{ item.keterangan ? item.keterangan : "Tidak ada keterangan" }}
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    isEmpty: Boolean,
    title: String,
    header: Array,
    type: String,
    showExpand: Boolean,
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    data() {
      if (this.type === "owner") {
        return this.$store.state.ownersData;
      }
      if (this.type === "ownerPage") {
        return this.$store.state.ownerDataUTTPs;
      }
      if (this.type === "dataUTTP") {
        const data = [...this.$store.state.dataUTTPs];
        return data;
      }
      return [];
    },
    emptyData: {
      get() {
        return this.isEmpty;
      },
      set(value) {
        return value;
      },
    },
  },
  methods: {
    handleClick(value) {
      if (this.type === "owner") {
        sessionStorage.setItem(
          value.nik,
          JSON.stringify({
            Nama: value.nama,
            NIK: value.nik,
            "Jumlah UTTP": value.jumlah_uttp,
            Terdaftar: value.createdAt,
          })
        );
        this.$router.push({
          name: `OwnerPage`,
          params: {
            nik: value.nik,
            ownerData: value,
          },
        });
      }
    },
    editForm(value) {
      if (this.type == "owner")
        this.$store.commit("toggleEditFormVisibility", value);

      this.$emit("showEditForm", value);
    },
    deleteDialog(item) {
      if (this.type == "owner")
        this.$store.commit("toggleDeleteDialog", item.nik);

      this.$emit("showDeleteDialog", item);
      if (!this.data.length) this.emptyData = true;
    },
  },
};
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
