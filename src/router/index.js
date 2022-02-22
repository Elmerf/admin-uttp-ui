import Vue from "vue";
import VueRouter from "vue-router";
import Owners from "../views/Owners.vue";
import OwnerPage from "../views/OwnerPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/pemilik",
    name: "Owners",
    alias: "/",
    component: Owners,
  },
  {
    path: "/pemilik/:nik",
    name: "OwnerPage",
    component: OwnerPage,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
