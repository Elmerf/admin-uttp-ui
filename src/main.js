import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

const instance = axios.create({
  baseURL: "https://admin-app=be.herokuapp.com",
});

instance.interceptors.request.use((config) => {
  if (localStorage.getItem("user-session"))
    config.headers["x-access-token"] = JSON.parse(
      localStorage.getItem("user-session")
    ).accessToken;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status == 401) {
      router.push("/auth/login").catch(() => {});
      localStorage.removeItem("user-session");
    }
    return Promise.reject(err);
  }
);

Vue.config.productionTip = false;
Vue.use(VueAxios, instance);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
