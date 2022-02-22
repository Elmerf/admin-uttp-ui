<template>
  <v-data-table
    :headers="header"
    :items="data"
    :loading="!data.length"
    class="elevation-4 mt-4 row-pointer"
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
            @click.stop="deleteDialog(item.nik)"
          >
            <v-icon medium> mdi-delete </v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    header: Array,
    type: String,
  },
  computed: {
    data() {
      if (this.type === "owner") {
        return this.$store.state.ownersData;
      }
      return [];
    },
  },
  methods: {
    handleClick(value) {
      if (this.type === "owner") {
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
      this.$store.commit("toggleEditFormVisibility", value);
    },
    deleteDialog(nik) {
      this.$store.commit("toggleDeleteDialog", nik);
    },
  },
};
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
