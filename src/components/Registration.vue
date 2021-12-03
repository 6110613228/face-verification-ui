<template>
  <v-container>
    <v-row>
      <v-col>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 0" step="0">Begin</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 1" step="1"
              >Example</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"
              >Step 1</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"
              >Example</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 4" step="4"
              >Step 2</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 5" step="5"
              >Waiting</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 6" step="6"
              >Finish</v-stepper-step
            >
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="0">
              <!-- Information -->
              <v-row>
                <v-col>
                  <p>
                    Face Registration:
                    ลงทะเบียนข้อมูลใบหน้าเพื่อให้ระบบของเราทราบว่าคุณคือใคร
                    โดยจะเก็บข้อมูลทั้งหมดสามอย่าง
                  </p>
                  <ol>
                    <li>วีดีโอหน้าพร้อมบัตร</li>
                    <li>ชื่อของคุณ</li>
                    <li>ภาพถ่ายหน้าบัตร</li>
                  </ol>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step1" color="primary">I'm ready</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="1">
              <v-row>
                <v-col>
                  <h1>ข้อมูลชุดที่ 1 : Video หน้าพร้อมบัตร</h1>
                  <p>
                    ถ่ายวีดีโอหน้าพร้อมบัตรตาม Mask ที่กำหนด
                    โดยหันหน้าไปทางซ้ายช้าๆเเละทางขวาช้าๆ
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h2 class="mb-2">Example.</h2>
                  <v-img
                    src="../assets/face_id_example.gif"
                    max-height="200"
                    max-width="500"
                    contain
                  ></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  กด
                  <v-btn color="primary" class="mx-2">
                    <v-icon>mdi-video</v-icon>
                  </v-btn>
                  สำหรับเริ่มการอัดวีดีโอเเละกด
                  <v-btn class="mx-2"><v-icon>mdi-stop</v-icon></v-btn>
                  สำหรับหยุดการอัดวีดีโอ
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  ใน Step 1 ท่านสามารถอัดวีดีโอใหม่ได้เรื่อยๆจนพึงพอใจเเละกด
                  <v-btn color="primary" class="mx-2">next step</v-btn>
                  เพื่อไปขั้นถัดไปได้ทันที
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step2" color="primary">next step</v-btn>
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-alert v-if="is_begin_record_alert" type="info" border="left">
                วีดีโอยังไม่ถูกบันทึกกรุณากด
                <v-btn color="primary">
                  <v-icon>mdi-video</v-icon>
                </v-btn>
                เพื่อเริ่มบันทึกวีดีโอ
              </v-alert>
              <v-alert v-if="is_alert" :type="alert_type" border="left">{{
                alert_text
              }}</v-alert>
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
                <v-col>
                  <v-btn @click="stopRecord"> <v-icon>mdi-stop</v-icon></v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step3" color="primary">next step</v-btn>
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-row>
                <v-col>
                  <h1>ข้อมูลชื่อและภาพหน้าบัตร</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p>ทำการกรอก</p>
                  <ol>
                    <li>ชื่อของคุณ</li>
                    <li>อัพโหลดรูปภาพหน้าบัตร</li>
                  </ol>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step4" color="primary">next step</v-btn>
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-row>
                <v-col>
                  <h1>ข้อมูลชื่อและภาพหน้าบัตร</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    label="กรุณากรอกชื่อ"
                    hint="Name"
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
                  <v-btn @click="step5" color="primary"
                    >Send my informations</v-btn
                  >
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="5" class="text-center">
              <v-row>
                <v-col> Please wait </v-col>
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
                <v-col> While We're processing your informations. </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="6">
              <v-row>
                <v-col class="text-center">
                  <h1>Finish</h1>
                  <h3>We got all required informations</h3>
                  <h1><v-icon color="primary" x-large>mdi-check-bold</v-icon></h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn to="/verification" block x-large color="black" class="white--text">verification</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

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

      is_begin_record_alert: false,

      is_alert: false,
      alert_text: "",
      alert_type: "info",

      is_loading: false,
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
    step0() {},
    step1() {
      this.step = 1;
    },
    step2() {
      this.step = 2;
      this.cameraInit();
    },
    step3() {
      this.step = 3;
    },
    step4() {
      this.step = 4;
    },
    step5() {
      this.sendData();
      this.step = 5;
    },
    step6() {
      this.step = 6;
    },
    back() {
      this.step--;
    },
    startRecord() {
      this.is_begin_record_alert = false;

      this.is_alert = true;
      this.alert_type = "info";
      this.alert_text = "เริ่มบันทึกวีดีโอ";

      this.mediaRecorder.start();
    },
    stopRecord() {
      this.is_alert = false;
      this.alert_type = "";
      this.alert_text = "";

      this.mediaRecorder.stop();

      this.is_begin_record_alert = true;
    },
    cameraInit() {
      // Screen flickering can be improve by using canvas. I think
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
          this.camera.srcObject = stream;
          this.camera.play();

          this.is_begin_record_alert = true;

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

          this.is_alert = true;
          this.alert_type = "error";
          this.alert_text = "Camera Permission denied.";
        });
    },
    sendData() {
      const formData = new FormData();
      formData.append("video", new Blob(this.chunks, { type: "video/mp4;" }));
      formData.append("image", this.image_file);
      formData.append("label", this.name);

      axios
        .post("http://127.0.0.1:8000/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.result == true) {
            this.step6();
          } else {
            this.back();
          }
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

<style>
#camera {
  max-width: 100%;
}
</style>
