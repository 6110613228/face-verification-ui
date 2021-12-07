<template>
  <v-app>
    <v-app-bar color="yellow darken-1" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>FaceCN</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-avatar
        :tile="true"
        min-width="300"
        max-width="343"
      >
        <v-img src="./assets/Logo_ECE.png" contain></v-img>
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav>
        <v-list-item-group v-model="group" active-class="text--accent-4">
          <v-list-item to="/">
            <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
            <v-list-item-title>Welcome</v-list-item-title>
          </v-list-item>
          <v-list-item to="/registration">
            <v-list-item-icon
              ><v-icon>mdi-account-plus</v-icon></v-list-item-icon
            >
            <v-list-item-title>Registration</v-list-item-title>
          </v-list-item>
          <v-list-item to="/verification">
            <v-list-item-icon
              ><v-icon>mdi-face-recognition</v-icon></v-list-item-icon
            >
            <v-list-item-title>Face verification</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-icon
              ><v-icon>mdi-information</v-icon></v-list-item-icon
            >
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
