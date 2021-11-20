<template>
  <v-container class="white--text">
    <v-row>
      <v-col>
        <video id="camera" class="d-flex mx-auto"></video>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ImageCapture: null,
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
        } catch (err) {
          console.log("No image capture feature");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
#camera {
  max-width: 80%;
}
</style>
