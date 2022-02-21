import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      ownerFormVisible: false,
    };
  },
  mutations: {
    toggleOwnerVisibility(state) {
      state.ownerFormVisible = !state.ownerFormVisible;
    },
  },
  actions: {},
  modules: {},
});
