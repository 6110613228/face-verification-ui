<template>
  <v-container>
    <v-alert v-if="is_alert" :type="alert_type" border="left">{{
      alert_text
    }}</v-alert>
    <v-row>
      <v-col class="text-center">
        <h1 id="response_text_element" class="orange--text">
          {{ response_text }}
        </h1>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-center">
        <div id="group">
          <video id="camera"></video>
          <canvas id="myCanvas"></canvas>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <v-btn depressed color="primary" @click="toggleCamera">
          <v-icon v-if="stream == null">mdi-webcam</v-icon>
          <v-icon v-else>mdi-webcam-off</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn @click="toggleSendImage">
          <v-icon v-if="is_sending" color="error">mdi-stop</v-icon>
          <v-icon v-else color="success">mdi-play</v-icon>
        </v-btn>
      </v-col>
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

      mask: null,
      ctx: null,
      x1: null,
      y1: null,
      w: null,
      h: null,
      text: null,

      is_sending: false,
      webSocket: null,
      interval: null,

      response_text_element: null,
      response_text: "",
      count_same_face: 0,
      count_not_same_face: 0,

      count_face: 0,
      is_same_person: "",
      found_faces: null,

      is_alert: false,
      alert_type: "success",
      alert_text: "",

      count: 0,
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

        this.stopSendImage();
      } else {
        this.Init();
      }
    },
    stopSendImage() {
      this.is_sending = false;
      clearInterval(this.interval);
      this.interval = null;
    },
    toggleSendImage() {
      if (this.webSocket.readyState == this.webSocket.OPEN) {
        if (this.stream != null) {
          if (this.is_sending) {
            // Stop sendding image
            this.is_sending = false;
            clearInterval(this.interval);
            this.interval = null;
          } else {
            // Stop sendding image
            this.is_sending = true;
            this.interval = setInterval(this.webSocketSendImage, 1000);

            this.response_text_element.className = "orange--text";
          }
        } else {
          // Stop sendding image
          this.is_sending = false;
          clearInterval(this.interval);
          this.interval = null;
        }
      } else {
        this.is_sending = false;

        // Alert
        this.alert_text =
          "WebSocket is on closed state. You can't send images.";
        this.alert_type = "error";
        this.is_alert = true;
      }
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
      this.mask = document.getElementById("myCanvas");
      this.ctx = this.mask.getContext("2d");
      this.response_text_element = document.getElementById(
        "response_text_element"
      );

      if (this.stream === null) {
        // Initial camera
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: "user",
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
            audio: false,
          })
          .then((stream) => {
            this.stream = stream;
            let { width, height } = stream.getTracks()[0].getSettings();
            this.canvas.width = width;
            this.canvas.height = height;
            this.camera.srcObject = stream;
            this.mask.width = width;
            this.mask.height = height;
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
    rec() {
      this.ctx.beginPath();
      this.ctx.rect(this.x1, this.y1, this.w, this.h);
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "green";
      this.ctx.fillText(
        this.text,
        this.x1 + this.x1 * 0.275,
        this.y1 - this.x1 * 0.05
      );
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = "green";
      this.ctx.stroke();
    },
    rect(x1, y1, w, h, text) {
      this.ctx.beginPath();
      this.ctx.rect(this.mask.width * 2 - (this.mask.width + x1 + w), y1, w, h);
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "green";
      this.ctx.fillText(
        text,
        this.mask.width * 2 - (this.mask.width + x1 + w),
        y1 - 5
      );
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = "green";
      this.ctx.stroke();
    },
    webSocketInit() {
      this.webSocket = new WebSocket("wss://d308-171-7-38-133.ngrok.io/ws");

      this.webSocket.onopen = () => {
        console.log("Connection opened.");
      };

      this.webSocket.onmessage = (event) => {
        // Parse JSON string to JSON object
        let web_socket_response = JSON.parse(event.data);

        if (
          this.found_faces != web_socket_response.found_faces &&
          this.is_sending
        ) {
          this.clearCanvas();
        }

        // Assign variables
        this.count_face = web_socket_response.count_face;
        this.is_same_person = web_socket_response.is_same_person;
        this.found_faces = web_socket_response.found_faces;

        if (this.count_face >= 1 && this.is_sending) {
          this.found_faces.forEach((face) => {
            this.rect(
              face["box"][0],
              face["box"][1],
              face["box"][2],
              face["box"][3],
              face["label"]
            );
          });
        }

        if (this.is_sending) {
          if (this.count_face == 2) {
            if (this.is_same_person) {
              this.count_same_face += 1;
            } else {
              this.count_not_same_face += 1;
            }
          }
        }

        if (this.count_same_face == 3) {
          this.stopSendImage();
          this.response_text_element.className =
            "green--text light-green lighten-1";
          this.response_text = "They are the same person";

          this.count_same_face = 0;
          this.count_not_same_face = 0;
          this.count = 0;
        }

        if (this.count_not_same_face == 20) {
          this.stopSendImage();
          this.response_text_element.className = "red--text red lighten-3";

          if (
            this.found_faces[0]["label"] == "UNKNOW" &&
            this.found_faces[1]["label"]
          ) {
            this.response_text = "They are both UNKNOW class";
          } else {
            this.response_text = "They are not the same person";
          }

          this.count_same_face = 0;
          this.count_not_same_face = 0;
          this.count = 0;
        }

        this.response_text = this.messageFormatted();

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
    messageFormatted() {
      if (this.is_sending) {
        if (this.count_face > 2) {
          return "Found more than 2 faces";
        } else if (this.count_face == 2) {
          return "Deciding...";
        } else if (this.count_face == 1) {
          return "Found only 1 face";
        } else {
          return "No face found";
        }
      } else {
        if (this.count == 0) {
          this.clearCanvas();
          this.found_faces.forEach((face) => {
            this.rectOrange(
              face["box"][0],
              face["box"][1],
              face["box"][2],
              face["box"][3],
              face["label"]
            );
          });
          this.count += 1;
        }
        return this.response_text;
      }
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.mask.width, this.mask.height);
    },
    rectOrange(x1, y1, w, h, text) {
      this.ctx.beginPath();
      this.ctx.rect(this.mask.width * 2 - (this.mask.width + x1 + w), y1, w, h);
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "orange";
      this.ctx.fillText(
        text,
        this.mask.width * 2 - (this.mask.width + x1 + w),
        y1 - 5
      );
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = "orange";
      this.ctx.stroke();
    },
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

<style scoped>
#camera {
  max-width: 80%;
  position: absolute;

  /*Mirror code starts*/
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
  /*Mirror code ends*/
}
#myCanvas {
  position: relative;
  top: 0;
  left: 0;
  max-width: 80%;
}

#group {
  position: relative;
  top: 0;
  left: 0;
}
</style>
