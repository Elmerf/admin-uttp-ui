<template>
  <v-container fluid>
    <app-heading title="Data Pemilik"></app-heading>
    <div>
      <add-button formType="owner"></add-button>
      <owners-form></owners-form>
    </div>
    <v-divider></v-divider>
    <data-table :header="headers" type="owner"></data-table>
  </v-container>
</template>

<script>
import AddButton from "../components/AddButton.vue";
import AppHeading from "../components/AppHeading.vue";
import DataTable from "../components/DataTable.vue";
import moment from "moment";
import OwnersForm from "../components/OwnersForm.vue";

export default {
  name: "OwnerView",
  data: () => {
    return {
      headers: [
        {
          text: "Nama",
          value: "nama",
          sortable: true,
          align: "start",
        },
        {
          text: "NIK",
          value: "nik",
          align: "center",
        },
        {
          text: "Terdaftar",
          value: "createdAt",
          align: "center",
        },
        {
          text: "Jumlah UTTP",
          value: "jumlah_uttp",
          align: "center",
        },
        {
          text: "Actions",
          value: "action",
          align: "center",
        },
      ],
      data: [],
    };
  },
  components: {
    AppHeading,
    AddButton,
    DataTable,
    OwnersForm,
  },
  mounted() {
    if (!this.$store.state.ownersData.length) {
      this.axios
        .get("/api/owners")
        .then((res) => {
          this.data = res.data.map((el) => {
            let localeDate = moment(el.createdAt).locale("id").format("LL");
            return {
              ...el,
              createdAt: localeDate,
            };
          });
          this.$store.commit("addOwners", this.data);
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>
