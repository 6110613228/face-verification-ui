<template>
  <v-container>
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
        <v-btn depressed color="primary" @click="toggleCamera">
          <v-icon v-if="stream == null">mdi-webcam</v-icon>
          <v-icon v-else>mdi-webcam-off</v-icon>
        </v-btn>
      </v-col>
      <v-col
        ><v-btn @click="toggleSendImage"
          ><v-icon v-if="is_sending">mdi-stop</v-icon>
          <v-icon v-else>mdi-play</v-icon></v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      camera: null,
      canvas: null,
      stream: null,

      is_sending: false,
      webSocket: null,
      interval: null,

      is_showtext: false,
      count_face: 0,
      is_same_person: "",
      found_faces: null,

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
    toggleCamera() {
      if (this.stream != null) {
        this.stream.getVideoTracks().forEach(function (track) {
          // Stop tracks
          track.stop();
        });

        // Set stream to null (No mediaStream)
        this.stream = null;

        // Set show text to false
        this.is_showtext = false;
      } else {
        this.Init();
      }
    },
    toggleSendImage() {
      if (!this.is_sending && this.stream != null) {
        // Sending image while there is mediaStream (Happy)
        if (this.webSocket.readyState == this.webSocket.OPEN) {
          this.is_sending = true;
          this.interval = setInterval(this.webSocketSendImage, 1000);
        } else {
          // Alert
          this.alert_text =
            "WebSocket is on closed state. You can't send images.";
          this.alert_type = "error";
          this.is_alert = true;
        }
      } else if (!this.is_sending && this.stream == null) {
        // Try to send image while no mediaStream

        // Alert
        this.alert_text = "Can't send images now. No camera device found!";
        this.alert_type = "info";
        this.is_alert = true;
      } else if (this.is_sending && this.stream == null) {
        // Sending image while no mediaStream
        // Something is very worng

        // Stop sendding image
        this.is_sending = false;
        clearInterval(this.interval);
        this.interval = null;

        // Alert
        this.alert_text = "Something wrong please refresh page and try again!";
        this.alert_type = "error";
        this.is_alert = true;
      } else {
        // Stop sendding image
        this.is_sending = false;
        clearInterval(this.interval);
        this.interval = null;
      } // End if
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

      if (this.stream === null) {
        // Initial camera
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: "user",
              width: { ideal: 4096 },
              height: { ideal: 2160 },
            },
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
      }
    },
    webSocketInit() {
      this.webSocket = new WebSocket("wss://95d1-119-76-28-98.ngrok.io/ws");

      this.webSocket.onopen = () => {
        console.log("Connection opened.");
      };

      this.webSocket.onmessage = (event) => {
        // Set showtext to true
        this.is_showtext = true;

        // Parse JSON string to JSON object
        let web_socket_response = JSON.parse(event.data);

        // Assign variables
        this.count_face = web_socket_response.count_face;
        this.is_same_person = web_socket_response.is_same_person;
        this.found_faces = web_socket_response.found_faces;
        console.log(web_socket_response);
      };

      this.webSocket.onclose = (event) => {
        console.log("Connectin closed.");

        // Alert
        this.alert_text =
          event.reason == "" ? "WebSocket connection is closed." : event.reason;
        this.alert_type = "info";
        this.is_alert = true;
      };
    },
  },
  computed: {
    messageFormatted() {
      if (this.count_face > 2) {
        return "Found more than 2 faces";
      } else if (this.count_face == 2) {
        if (this.is_same_person) {
          return "Same person";
        } else {
          return "Not same person";
        }
      } else if (this.count_face == 1) {
        return "Found only 1 face";
      } else {
        return "No face found";
      }
    },
  },
};
</script>

<style scoped>
#camera {
  max-width: 100%;
  /*Mirror code starts*/
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
  /*Mirror code ends*/
}
</style>
