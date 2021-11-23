<template>
  <v-container class="white--text">
    <v-alert v-if="is_alert" :type="alert_type" border="left">{{
      alert_text
    }}</v-alert>
    <v-row v-if="is_showtext">
      <v-col class="text-center">
        <h1>{{ showtext }}</h1>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <video id="camera" class="d-flex mx-auto"></video>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <v-btn depressed color="primary" @click="startCamera">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </v-col>
      <v-col
        ><v-btn @click="stopCamera" depressed color="error">
          <v-icon>mdi-stop</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-btn @click="webSocketSendImage">send</v-btn>
    {{ web_socket_response }}
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      webSocket: null,
      imageCapture: null,
      stream: null,

      web_socket_response: null,

      is_showtext: true,
      showtext: "Same person",

      is_alert: false,
      alert_type: "success",
      alert_text: "",
    };
  },
  mounted() {
    this.cameraInit();
    this.webSocketInit();
  },
  methods: {
    startCamera() {
      this.init();
    },
    stopCamera() {
      this.stream.getVideoTracks().forEach(function (track) {
        // Stop tracks
        track.stop();
      });
    },
    webSocketSendImage() {
      this.imageCapture.takePhoto().then((blob) => {
        this.webSocket.send(blob);
      });
    },
    cameraInit() {
      // Initial camera
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })
        .then((stream) => {
          this.stream = stream;
          const track = stream.getVideoTracks()[0];
          try {
            this.imageCapture = new ImageCapture(track);
            let camera = document.getElementById("camera");
            camera.srcObject = stream;
            camera.play();
          } catch (error) {
            // console.log
            console.log(error);
            console.log(
              "Your browser doesn't support ImageCapture API, Please change your browser to Chrome/Edge."
            );

            // Alert
            this.alert_text =
              "Your browser doesn't support ImageCapture API, please change your browser to Chrome/Edge.";
            this.alert_type = "error";
            this.is_alert = true;
          }
        })
        .catch((error) => {
          // console.log
          console.log(error);

          // Alert
          this.alert_text = "Can't access user's device or no device found.";
          this.alert_type = "error";
          this.is_alert = true;
        });
    },
    webSocketInit() {
      this.webSocket = new WebSocket("ws://127.0.0.1:8000/ws/verification");

      this.webSocket.onopen = () => {
        console.log("Connection opened.");
      };

      this.webSocket.onmessage = (event) => {
        this.web_socket_response = event.data;
      };

      this.webSocket.onclose = () => {
        console.log("Connectin closed.");
      };
    },
  },
};
</script>

<style>
#camera {
  max-width: 70%;
}
</style>
