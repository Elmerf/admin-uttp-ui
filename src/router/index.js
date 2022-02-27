import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/overview",
    name: "Overview",
    alias: "/",
    component: () => import("../views/Overview.vue"),
  },
  {
    path: "/pemilik",
    name: "Owners",
    component: () => import("../views/Owners.vue"),
  },
  {
    path: "/pemilik/:nik",
    name: "OwnerPage",
    component: () => import("../views/OwnerPage.vue"),
    props: true,
  },
  {
    path: "/data-uttp",
    name: "DataUTTP",
    component: () => import("../views/DataUTTP.vue"),
  },
  {
    path: "/laporan",
    name: "LaporanPage",
    component: () => import("../views/Laporan.vue"),
  },
  {
    path: "/setting",
    name: "SettingPage",
    component: () => import("../views/Setting.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
