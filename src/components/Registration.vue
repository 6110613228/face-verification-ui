<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Step 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Step 2</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">Step 3</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          step1
        </v-stepper-content>
        <v-stepper-content step="2">
          step2
        </v-stepper-content>
        <v-stepper-content step="3">
          step3
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-btn @click="step = 1">step1</v-btn>
    <v-btn @click="step = 2">step2</v-btn>
    <v-btn @click="step = 3">step3</v-btn>
    <v-btn @click="step = 4">finish</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
    };
  },
};
</script>

<style></style>
