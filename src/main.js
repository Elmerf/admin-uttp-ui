import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

const instance = axios.create({
  baseURL: "https://admin-app-be.herokuapp.com/",
});

Vue.config.productionTip = false;
Vue.use(VueAxios, instance);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
