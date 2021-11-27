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
              <v-row>
                <v-col>
                  <video id="camera" controls></video>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="startRecord" color="primary"
                    ><v-icon>mdi-video</v-icon></v-btn
                  >
                </v-col>
                <v-col>
                  <v-btn @click="stopRecord"><v-icon>mdi-stop</v-icon></v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="2"> step2 </v-stepper-content>
            <v-stepper-content step="3"> Waiting </v-stepper-content>
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
        <v-btn @click="step1">step1</v-btn>
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

      stream: null,
      camera: null,
      mediaRecorder: null,
      chunks: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    step1() {
      this.step = 1;
      this.cameraInit();
    },
    startRecord() {
      this.mediaRecorder.start();
    },
    stopRecord() {
      this.mediaRecorder.stop();
    },
    cameraInit() {
      // Screen flickering can be improve by using canvas. I think
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })
        .then((stream) => {
          this.stream = stream;
          this.camera.srcObject = stream;
          this.camera.play();

          this.mediaRecorder = new MediaRecorder(stream);

          this.mediaRecorder.onstart = () => {
            console.log("start");

            this.camera.srcObject = stream;
            this.camera.play();
          };

          this.mediaRecorder.onstop = () => {
            console.log("Stop");

            this.camera.srcObject = null;

            var blob = new Blob(this.chunks, { type: "video/mp4" });
            this.camera.src = URL.createObjectURL(blob);
          };

          this.mediaRecorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    init() {
      this.camera = document.getElementById("camera");
    },
  },
};
</script>

<style></style>
