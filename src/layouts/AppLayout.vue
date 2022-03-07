<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar color="red darken-1">
            <v-icon large color="white"> mdi-account </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="red darken-1">
          <v-list-item
            v-for="(item, i) in filteredList"
            :key="i"
            @click="pushRouterTo(item.path)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="red darken-2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="cursor: pointer" @click="pushRouterTo('/', 0)"
        >Admin UTTP</v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AppLayout",
  data: () => ({
    drawer: null,
    selectedItem: 0,
    items: [
      {
        text: "Overview",
        icon: "mdi-view-dashboard",
        path: "/overview",
        role: ["ROLE_ADMIN"],
      },
      {
        text: "Pemilik UTTP",
        icon: "mdi-account-multiple",
        path: "/pemilik",
        role: ["ROLE_ADMIN", "ROLE_SURVEYOR"],
      },
      {
        text: "Data UTTP",
        icon: "mdi-star",
        path: "/data-uttp",
        role: ["ROLE_ADMIN", "ROLE_SURVEYOR"],
      },
      {
        text: "Laporan",
        icon: "mdi-file-chart-outline",
        path: "/laporan",
        role: ["ROLE_ADMIN", "ROLE_SURVEYOR"],
      },
      {
        text: "Setting",
        icon: "mdi-cog",
        path: "/setting",
        role: ["ROLE_ADMIN"],
      },
    ],
  }),
  computed: {
    username() {
      return JSON.parse(localStorage.getItem("user-session")).username;
    },
    role() {
      const role = JSON.parse(localStorage.getItem("user-session")).role;
      return role.split("_")[1];
    },
    filteredList() {
      const role = JSON.parse(localStorage.getItem("user-session")).role;
      return this.items.filter((el) => el.role.some((e) => e === role));
    },
  },
  methods: {
    pushRouterTo(path, index) {
      if (index !== undefined) this.selectedItem = index;
      this.$router.push(path).catch(() => {});
    },
    logout() {
      localStorage.removeItem("user-session");
      this.$router.push("/auth/login");
    },
  },
};
</script>
