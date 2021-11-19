<template>
  <v-app style="background-color: black">
    <v-app-bar color="yellow darken-1" app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>App</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>
