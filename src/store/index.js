import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      editFormVisible: false,
      deleteDialogVisible: false,
      ownerFormVisible: false,
      ownersData: [],
      ownerEditItem: {},
      ownerOldNik: "",
      ownerSelectedIndex: -1,
      ownerDataUTTPs: [],
    };
  },
  mutations: {
    toggleOwnerVisibility(state) {
      state.ownerFormVisible = !state.ownerFormVisible;
    },
    toggleEditFormVisibility(state, data) {
      state.editFormVisible = !state.editFormVisible;
      Object.assign(state.ownerEditItem, data);
      state.ownerOldNik = data.nik;
      state.ownerSelectedIndex = state.ownersData.indexOf(data);
    },
    toggleDeleteDialog(state, value) {
      state.deleteDialogVisible = !state.deleteDialogVisible;
      state.ownerOldNik = value;
      state.ownerSelectedIndex = state.ownersData
        .map((e) => e.nik)
        .indexOf(value);
    },
    addOwners(state, data) {
      state.ownersData.push(...data);
    },
    editOwner(state, value) {
      Object.assign(state.ownersData[value.index], value.data);
    },
    deleteOwner(state, index) {
      state.ownersData.splice(index, 1);
    },
    addOwnerDataUTTP(state, data) {
      state.ownerDataUTTPs.push(...data);
    },
    emptiedOwnerDataUTTP(state) {
      state.ownerDataUTTPs = [];
    },
  },
  actions: {},
  modules: {},
});
