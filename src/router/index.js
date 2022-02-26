import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/pemilik",
    name: "Owners",
    alias: "/",
    component: () => import("../views/Owners.vue"),
  },
  {
    path: "/pemilik/:nik",
    name: "OwnerPage",
    component: () => import("../views/OwnerPage.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
