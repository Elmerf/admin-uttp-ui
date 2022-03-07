<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="red darken-2">
              <v-toolbar-title>Login Dashboard</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  color="red"
                  prepend-icon="mdi-account"
                  name="login"
                  label="Login"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  color="red"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" @click="submitCredential"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "LoginPage",
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    submitCredential() {
      this.axios
        .post("/api/auth/signin", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("user-session", JSON.stringify(res.data));
          this.$router.push({ name: "Overview" });
        })
        .catch((err) => this.$emit("showError", err.response.data.message));
    },
  },
};
</script>

<style></style>
