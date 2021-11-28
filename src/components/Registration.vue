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
              <v-row>
                <v-col><p>Information about what we are going to do</p></v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step1" color="primary">I'm ready</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="1">
              <v-row>
                <v-col class="text-center">
                  <video id="camera" controls></video>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-right">
                  <v-btn @click="startRecord" color="primary">
                    <v-icon>mdi-video</v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  ><v-btn @click="stopRecord"
                    ><v-icon>mdi-stop</v-icon></v-btn
                  ></v-col
                >
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step2" color="primary">next step</v-btn>
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    label="Your name"
                    hint="name"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-file-input
                    v-model="image_file"
                    label="Upload your image"
                    placeholder="Select your files"
                    filled
                    accept="image/*"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-img :src="fileToUrl()" max-height="500" contain></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step3" color="primary"
                    >Send my informations</v-btn
                  >
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="3" class="text-center">
              <v-row>
                <v-col>
                  Please wait
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  While We're processing your informations.
                </v-col>
              </v-row>
            </v-stepper-content>
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
  </v-container>
</template>

<script>
import { axios } from "axios";

export default {
  data() {
    return {
      step: 0,

      stream: null,
      camera: null,
      mediaRecorder: null,
      chunks: [],

      name: "",
      image_file: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    fileToUrl() {
      if (this.image_file != null) {
        return URL.createObjectURL(this.image_file);
      }
      return "";
    },
    step1() {
      this.step = 1;
      this.cameraInit();
    },
    step2() {
      this.step = 2;
    },
    step3() {
      this.step = 3;
    },
    back() {
      this.step--;
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
    sendData() {
      axios.get();
    },
    init() {
      this.camera = document.getElementById("camera");
    },
  },
};
</script>

<style></style>
