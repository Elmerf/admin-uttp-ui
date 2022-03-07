import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "overview",
        name: "Overview",
        alias: "/",
        meta: {
          role: ["ROLE_ADMIN"],
        },
        component: () => import("../views/Overview.vue"),
      },
      {
        path: "pemilik",
        name: "Owners",
        meta: {
          role: ["ROLE_ADMIN", "ROLE_SURVEYOR"],
        },
        component: () => import("../views/Owners.vue"),
      },
      {
        path: "pemilik/:nik",
        name: "OwnerPage",
        meta: {
          role: ["ROLE_ADMIN", "ROLE_SURVEYOR"],
        },
        component: () => import("../views/OwnerPage.vue"),
        props: true,
      },
      {
        path: "data-uttp",
        name: "DataUTTP",
        component: () => import("../views/DataUTTP.vue"),
      },
      {
        path: "laporan",
        name: "LaporanPage",
        meta: {
          role: ["ROLE_ADMIN", "ROLE_SURVEYOR"],
        },
        component: () => import("../views/Laporan.vue"),
      },
      {
        path: "setting",
        name: "SettingPage",
        meta: {
          role: ["ROLE_ADMIN"],
        },
        component: () => import("../views/Setting.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("../layouts/LoginLayout.vue"),
    name: "Auth",
    children: [
      {
        path: "login",
        component: () => import("../views/Login.vue"),
        name: "Login",
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
