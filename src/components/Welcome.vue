<template>
  <v-container class="white--text" fill-height>
    <v-row>
      <v-col>
        <v-btn
          to="/registration"
          block
          x-large
          color="black"
          class="white--text"
          >Registration</v-btn
        >
      </v-col>
      <v-col>
        <v-btn
          to="/verification"
          block
          x-large
          color="black"
          class="white--text"
          >Face verification</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {};
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "FaceCN";
      },
    },
  },
};
</script>
