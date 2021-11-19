<template>
  <v-container class="white--text" fill-height>
    <v-row>
      <v-col>
        <v-btn to="/registration" block x-large>Registration</v-btn>
      </v-col>
      <v-col>
        <v-btn to="/verification" block x-large>Face verification</v-btn>
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
};
</script>
