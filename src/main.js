import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.9:3000",
});

Vue.config.productionTip = false;
Vue.use(VueAxios, instance);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
