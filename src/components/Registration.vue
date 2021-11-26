<template>
  <v-container>
    <v-row>
      <v-col>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 0" step="0">Begin</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 1" step="1"
              >Step 1</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"
              >Step 2</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"
              >Step 3</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 4" step="F"
              >Finish</v-stepper-step
            >
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="0">
              <!-- Information -->
              Information about what we are going to do
            </v-stepper-content>
            <v-stepper-content step="1">
              <v-container></v-container>
            </v-stepper-content>
            <v-stepper-content step="2"> step2 </v-stepper-content>
            <v-stepper-content step="3"> step3 </v-stepper-content>
            <v-stepper-content step="4">
              <!-- Waiting for process -->
              Finish
            </v-stepper-content>
            <v-stepper-content step="5">
              <!-- Waiting for process -->
              Actually Finish
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="step = 0">begin</v-btn>
        <v-btn @click="step = 1">step1</v-btn>
        <v-btn @click="step = 2">step2</v-btn>
        <v-btn @click="step = 3">step3</v-btn>
        <v-btn @click="step = 4">finish page</v-btn>
        <v-btn @click="step = 5">actually finish</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      step: 0,
    };
  },
};
</script>

<style></style>
