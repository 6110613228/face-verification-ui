<template>
  <v-container class="white--text">
    <v-alert v-if="is_alert" :type="alert_type">{{ alert_text }}</v-alert>
    <v-row>
      <v-col>
        <video id="camera" class="d-flex mx-auto"></video>
      </v-col>
    </v-row>
    <v-row>
      <v-col><v-btn>Start</v-btn></v-col>
      <v-col><v-btn>Stop</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ImageCapture: null,

      is_alert: false,
      alert_type: "success",
      alert_text: "",
    };
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      .then((stream) => {
        const track = stream.getVideoTracks()[0];
        try {
          this.ImageCapture = new ImageCapture(track);
          let camera = document.getElementById("camera");
          camera.srcObject = stream;
          camera.play();
        } catch (error) {
          // console.log
          console.log(error);
          console.log(
            "Your browser doesn't support ImageCapture API, Please change your browser to chrome."
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
};
</script>

<style>
#camera {
  max-width: 80%;
}
</style>
