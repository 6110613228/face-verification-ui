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
                  <h1>
                    Face Registration:
                    ลงทะเบียนข้อมูลใบหน้าเพื่อให้ระบบของเราทราบว่าคุณคือใคร
                    โดยจะเก็บข้อมูลทั้งหมดสามอย่าง
                  </h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h2>สิ่งที่จะเก็บ</h2>
                  <ol>
                    <li>วีดีโอหน้าพร้อมบัตร</li>
                    <li>ข้อมูลเลขบัตรประจำตัวประชาชนหรือเลขประจำตัวนักศึกษา</li>
                    <li>
                      ภาพถ่ายหน้าบัตรประจำตัวประชาชนหรือบัตรประจำตัวนักศึกษา
                    </li>
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
              <!-- Step 1 Example -->
              <v-row>
                <v-col>
                  <h1>Step 1 Example: Video หน้าพร้อมบัตร</h1>
                  <p>
                    ถ่ายวีดีโอหน้าพร้อมบัตรตาม Mask ที่กำหนด
                    โดยหันหน้าไปทางซ้ายช้าๆเเละทางขวาช้าๆ
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h2>วิธีการใช้งาน</h2>
                  <ol>
                    <li>
                      กดปุ่ม
                      <v-btn class="mx-2" color="primary" small
                        >to step 1</v-btn
                      >
                      เพื่อไปยัง step 1
                    </li>
                    <li>
                      ใน Step 1 ท่านสามารถ กดปุ่ม
                      <v-btn color="error" class="mx-2" small>
                        <v-icon small>mdi-video</v-icon>
                      </v-btn>
                      สำหรับเริ่มการอัดวีดีโอเเละกดปุ่ม
                      <v-btn class="mx-2" color="depress" small
                        ><v-icon small>mdi-stop</v-icon></v-btn
                      >
                      สำหรับหยุดการอัดวีดีโอ
                    </li>
                    <li>
                      ใน Step 1
                      ท่านสามารถอัดวีดีโอใหม่ได้เรื่อยๆจนพึงพอใจเเละกดปุ่ม
                      <v-btn color="primary" class="mx-2" small
                        >next step</v-btn
                      >
                      เพื่อไปขั้นถัดไป
                    </li>
                  </ol>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h2 class="mb-2">Example.</h2>
                  <v-img
                    src="../assets/face_id_example.gif"
                    max-width="500"
                    contain
                  ></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step2" color="primary">to step 1</v-btn>
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="2">
              <!-- Step 1 -->
              <v-alert v-if="is_begin_record_alert" type="info" border="left">
                วีดีโอยังไม่ถูกบันทึกกรุณากด
                <v-btn color="error" class="mx-2" small>
                  <v-icon small>mdi-video</v-icon>
                </v-btn>
                เพื่อเริ่มบันทึกวีดีโอ
              </v-alert>
              <v-alert v-if="is_alert" :type="alert_type" border="left">{{
                alert_text
              }}</v-alert>
              <v-row>
                <v-col>
                  <h1>Step 1: Video หน้าพร้อมบัตร</h1>
                </v-col>
                <v-col md="4"
                  ><v-select
                    v-model="select_card"
                    :items="cards"
                    @change="draw()"
                    solo
                  ></v-select
                ></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-center">
                  <div id="group">
                    <video id="videoPlay"></video>
                    <canvas id="myCanvas"></canvas>
                  </div>
                  <video
                    id="videoReplay"
                    style="display: None"
                    controls
                  ></video>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-center">
                  <v-btn
                    v-if="is_begin_record_alert"
                    @click="startRecord"
                    color="error"
                  >
                    <v-icon>mdi-video</v-icon>
                  </v-btn>
                  <v-btn v-else @click="stopRecord">
                    <v-icon>mdi-stop</v-icon></v-btn
                  >
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
              <!-- Step 2 Example -->
              <v-row>
                <v-col>
                  <h1>
                    Step 2 Example:
                    ข้อมูลเลขบัตรประจำตัวประชาชนหรือเลขประจำตัวนักศึกษาและภาพหน้าบัตร
                  </h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h2>ทำการกรอก</h2>
                  <ol>
                    <li>
                      เลขบัตรประจำตัวประชาชนหรือเลขประจำตัวนักศึกษาของตนเอง
                    </li>
                    <li>
                      อัพโหลดรูปภาพหน้าบัตรประจำตัวประชาชนหรือบัตรนักศึกษา&nbsp;<strong
                        >แนวนอน</strong
                      >
                    </li>
                  </ol>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h2>Example.</h2>
                  <v-img
                    src="../assets/card_example.jpg"
                    max-width="500"
                    contain
                  ></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step4" color="primary">to step 2</v-btn>
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="4">
              <!-- Step 2 -->
              <v-alert v-if="is_fail_result" type="error" border="left">{{
                response_message
              }}</v-alert>
              <v-row>
                <v-col>
                  <h1>
                    Step 2:
                    ข้อมูลเลขบัตรประจำตัวประชาชนหรือเลขประจำตัวนักศึกษาและภาพหน้าบัตร
                  </h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="label"
                    label="กรุณากรอกเลขบัตรประจำตัวประชาชนหรือเลขประจำตัวนักศึกษามหาวิทยาลัยธรรมศาสตร์ของตนเอง"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-file-input
                    v-model="image_file"
                    label="Upload your image (แนวนอน)"
                    placeholder="Select your file"
                    filled
                    accept="image/*"
                    prepend-icon="mdi-image"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-img :src="fileToUrl()" max-height="400" contain></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="step5" color="primary" :loading="is_loading"
                    >Send my informations</v-btn
                  >
                  <v-btn @click="back" color="depress">back</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="5">
              <!-- Waiting -->
              <v-row>
                <v-col class="text-center"> Please wait </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  While We're processing your informations.
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="6">
              <!-- Finished -->
              <v-row>
                <v-col class="text-center">
                  <h1>Finished</h1>
                  <h3>We got all required informations</h3>
                  <h1>
                    <v-icon color="primary" x-large>mdi-check-bold</v-icon>
                  </h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    to="/verification"
                    block
                    x-large
                    color="black"
                    class="white--text"
                    >verification</v-btn
                  >
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
      group: null,
      videoPlay: null,
      videoReplay: null,
      mediaRecorder: null,
      chunks: [],

      mask: null,

      select_card: 0,
      cards: [
        { text: "Student ID card", value: 0 },
        { text: "Student ID card(Horizontal)", value: 1 },
        { text: "National ID card", value: 2 },
      ],

      label: "",
      image_file: null,

      is_begin_record_alert: false,

      is_alert: false,
      alert_text: "",
      alert_type: "info",

      is_fail_result: false,
      response_message: "",

      is_loading: false,
    };
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
    },
    step2() {
      this.step = 2;
      this.cameraInit();
    },
    step3() {
      if (this.group.style.display == "inline-block") {
        this.stopRecord();
      }
      this.step = 3;
    },
    step4() {
      this.step = 4;
    },
    step5() {
      this.step = 5;
      this.sendData();
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
      this.mask = document.getElementById("myCanvas");

      // Screen flickering can be improve by using canvas. I think
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

          this.videoPlay.srcObject = stream;
          this.videoPlay.play();

          // Set mask width, height
          this.mask.width = width;
          this.mask.height = height;
          this.draw();

          this.is_begin_record_alert = true;

          this.mediaRecorder = new MediaRecorder(stream);

          this.mediaRecorder.onstart = () => {
            console.log("start");

            this.chunks = [];
            this.group.style.display = "inline-block";
            this.videoReplay.style.display = "None";
          };

          this.mediaRecorder.onstop = () => {
            console.log("Stop");

            this.group.style.display = "None";
            this.videoReplay.style.display = "inline-block";

            var blob = new Blob(this.chunks, { type: "video/mp4" });
            this.videoReplay.src = URL.createObjectURL(blob);
          };

          this.mediaRecorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
          };
        })
        .catch((error) => {
          console.log(error);

          this.is_alert = true;
          this.alert_type = "error";
          this.alert_text = error.message;
        });
    },
    draw() {
      let ctx = this.mask.getContext("2d");
      ctx.clearRect(0, 0, this.mask.width, this.mask.height);
      if (this.select_card == 0) {
        ctx = this.mask.getContext("2d");

        let path1 = new Path2D();
        path1.rect(
          this.mask.width * 0.1,
          this.mask.height * 0.2,
          this.mask.width * 0.5,
          this.mask.height * 0.55
        );
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.stroke(path1);

        let path2 = new Path2D();
        path2.rect(
          this.mask.width * 0.125,
          this.mask.height * 0.25,
          this.mask.width * 0.095,
          this.mask.height * 0.235
        );
        ctx.stroke(path2);

        let path3 = new Path2D();
        path3.lineWidth = 5;
        path3.strokeStyle = "green";

        path3.ellipse(
          this.mask.width * 0.77,
          this.mask.height * 0.5,
          this.mask.width * 0.125,
          this.mask.height * 0.275,
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke(path3);
      } else if (this.select_card == 1) {
        console.log("selected = 1");
        ctx = this.mask.getContext("2d");

        let path1 = new Path2D();
        path1.rect(
          this.mask.width * 0.05,
          this.mask.height * 0.12,
          this.mask.width * 0.3,
          this.mask.height * 0.85
        );
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.stroke(path1);

        let path2 = new Path2D();
        path2.rect(
          this.mask.width * 0.055,
          this.mask.height * 0.55,
          this.mask.width * 0.1,
          this.mask.height * 0.235
        );
        ctx.stroke(path2);

        let path3 = new Path2D();
        path3.lineWidth = 5;
        path3.strokeStyle = "green";

        path3.ellipse(
          this.mask.width * 0.77,
          this.mask.height * 0.5,
          this.mask.width * 0.125,
          this.mask.height * 0.275,
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke(path3);
      } else if (this.select_card == 2) {
        console.log("selected = 2");
        ctx = this.mask.getContext("2d");

        let path1 = new Path2D();
        path1.rect(
          this.mask.width * 0.1,
          this.mask.height * 0.2,
          this.mask.width * 0.5,
          this.mask.height * 0.55
        );
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.stroke(path1);

        let path2 = new Path2D();
        path2.rect(
          this.mask.width * 0.12,
          this.mask.height * 0.47,
          this.mask.width * 0.1,
          this.mask.height * 0.235
        );
        ctx.stroke(path2);

        let path3 = new Path2D();
        path3.lineWidth = 5;
        path3.strokeStyle = "green";

        path3.ellipse(
          this.mask.width * 0.77,
          this.mask.height * 0.5,
          this.mask.width * 0.125,
          this.mask.height * 0.275,
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke(path3);
      } else {
        console.log("selected is invalid");
      }
    },
    sendData() {
      this.is_loading = true;
      this.is_fail_result = false;

      if (
        this.image_file != null &&
        this.label != "" &&
        this.chunks.length != 0
      ) {
        const formData = new FormData();
        formData.append("video", new Blob(this.chunks, { type: "video/avi;" }));
        formData.append("image", this.image_file);
        formData.append("label", this.label);

        axios
          .post("https://d308-171-7-38-133.ngrok.io/register", formData, {
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

            this.is_fail_result = !response.data.result;
            this.response_message = response.data.message;
            this.is_loading = false;
          })
          .catch((error) => {
            console.log(error);

            this.back();

            this.is_fail_result = true;
            this.response_message = error.message;
            this.is_loading = false;
          });
      } else {
        this.back();
        this.is_fail_result = true;
        this.response_message = "You didn't complete all the required form";
        this.is_loading = false;
      }
    },
    init() {
      this.group = document.getElementById("group");
      this.videoPlay = document.getElementById("videoPlay");
      this.videoReplay = document.getElementById("videoReplay");
    },
  },
  mounted() {
    this.init();
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
#videoPlay {
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

#videoReplay {
  max-width: 80%;
}

li {
  margin-bottom: 4px;
}
</style>
