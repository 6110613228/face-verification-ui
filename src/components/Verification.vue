<template>
  <v-container class="white--text">
    <v-alert v-if="is_alert" :type="alert_type" border="left">{{
      alert_text
    }}</v-alert>
    <v-row v-if="is_showtext">
      <v-col class="text-center">
        <h1>{{ messageFormatted }}</h1>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      camera: null,
      canvas: null,
      stream: null,

      webSocket: null,

      is_showtext: false,
      message: "",
      count_face: 0,

      is_alert: false,
      alert_type: "success",
      alert_text: "",
    };
  },
  mounted() {
    this.Init();
    this.webSocketInit();
  },
  methods: {
    startCamera() {
      this.Init();
    },
    stopCamera() {
      this.stream.getVideoTracks().forEach(function (track) {
        // Stop tracks
        track.stop();
      });
    },
    webSocketSendImage() {
      this.canvas
        .getContext("2d")
        .drawImage(this.camera, 0, 0, this.canvas.width, this.canvas.height);
      this.canvas.toBlob((blob) => {
        this.webSocket.send(blob);
      });
    },
    Init() {
      this.camera = document.getElementById("camera");
      this.canvas = document.createElement("canvas");

      // Initial camera
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })
        .then((stream) => {
          this.stream = stream;
          let { width, height } = stream.getTracks()[0].getSettings();
          this.canvas.width = width;
          this.canvas.height = height;
          this.camera.srcObject = stream;
          this.camera.play();
        })
        .catch((error) => {
          // console.log
          console.log(error);

          // Alert
          this.alert_text = error;
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
        // Set showtext to true
        this.is_showtext = true;

        // Parse JSON string to JSON object
        let web_socket_response = JSON.parse(event.data);

        // Assign variables
        this.message = web_socket_response.message;
        this.count_face = web_socket_response.count_face;
      };

      this.webSocket.onclose = () => {
        console.log("Connectin closed.");

        // Alert
        this.alert_text = "WebSocket connection is closed.";
        this.alert_type = "info";
        this.is_alert = true;
      };
    },
  },
  computed: {
    messageFormatted() {
      return this.message + " " + this.count_face;
    },
  },
};
</script>

<style>
#camera {
  max-width: 70%;
}
</style>
