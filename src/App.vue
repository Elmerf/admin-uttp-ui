<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> John Leider </v-list-item-title>
            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="red darken-1">
          <v-list-item
            v-for="(item, i) in items"
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="red darken-2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Admin UTTP</v-toolbar-title>
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
  data: () => ({
    drawer: null,
    selectedItem: 0,
    items: [
      { text: "Overview", icon: "mdi-view-dashboard", path: "/overview" },
      { text: "Pemilik UTTP", icon: "mdi-account-multiple", path: "/pemilik" },
      { text: "Data UTTP", icon: "mdi-star", path: "/data-uttp" },
      { text: "Laporan", icon: "mdi-file-chart-outline", path: "/laporan" },
      { text: "Setting", icon: "mdi-cog", path: "/setting" },
    ],
  }),
  methods: {
    pushRouterTo(path) {
      this.$router.push(path).catch(() => {});
    },
  },
};
</script>
