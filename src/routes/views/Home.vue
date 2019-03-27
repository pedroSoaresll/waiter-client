<template>
  <v-container fluid>
    <v-layout column wrap>
      <v-flex xs12 align-self-center>
        <div class="area-logo">
          <h1 class="text-xs-center">Atendimento</h1>
          <p class="text-xs-right font-size-sm">Virtual</p>
        </div>
      </v-flex>

      <v-flex row wrap>
        <p class="font-size-md mt-3 mb-3">
          Aponte a câmera para o <span class="font-weight-bold">QR Code</span> localizado
          na mesa do restaurante que você se encontra</p>
      </v-flex>

      <!--camera-->
      <div class="camera-wrapper">
        <v-btn
               :hidden="cameraPermission !== 'prompt'"
               color="info" class="enable-camera">Habilitar Câmera</v-btn>
        <video hidden autoplay ref="video" class="camera"></video>
        <canvas ref="canvas" width="315" height="315"></canvas>
      </div>

      <p v-if="cameraNotFound" class="error--text">
        Não foi localizado nenhuma câmera em seu dispositivo</p>

      <!--alert-->
      <v-flex row wrap class="mt-3">
        <v-alert type="info" :value="true">
          <span class="font-size-sm">Assim que o QR Code for reconhecido você será
          redirecionado para a tela do cardápio do restaurante
          que você se encontra :)</span>
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import jsQR from 'jsqr';

export default {
  data: () => ({
    cameraPermission: 'prompt',
    cameraNotFound: false,
    qrScanner: null,
  }),
  methods: {
    handleVideoTimeCallback() {
      const { video } = this.$refs;
      let timer;

      if (video.paused || video.ended) {
        if (timer) clearTimeout(timer);
        return;
      }

      this.handleVideoFrame();
      timer = setTimeout(() => {
        this.handleVideoTimeCallback();
      }, 500);
    },

    handleVideoFrame() {
      const width = 350;
      const height = 350;
      const { canvas } = this.$refs;
      const { video } = this.$refs;

      const canvasContext = canvas.getContext('2d', { alpha: false });

      canvasContext.drawImage(video, 0, 0, width, height);
      const frame = canvasContext.getImageData(0, 0, width, height);

      const code = jsQR(frame.data, width, height);
      if (code) this.$store.dispatch('client/startSession', code);
    },

    async handlePermissionCamera(permissionStatus) {
      console.log('camera has been called', permissionStatus);

      switch (permissionStatus.state) {
        case 'prompt':
        case 'granted':
          navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: 300, height: 300 } })
            .then((mediaStream) => {
              const { video } = this.$refs;
              video.srcObject = mediaStream;
              video.addEventListener('play', this.handleVideoTimeCallback);
            })
          break;
        case 'denied':
          console.log('user denied the camera');
          break;
        default:
          break;
      }
    },
  },
  beforeDestroy() {
    const { video } = this.$refs;
    video.pause();
    console.log(video);
  },
  mounted() {
    if ('navigator' in window) {
      // have navigator property
      const that = this;
      navigator.permissions.query({ name: 'camera' })
        .then((permissionStatus) => {
          this.handlePermissionCamera(permissionStatus);
          permissionStatus.onchange = function () {
            that.handlePermissionCamera(this);
          };
        })
        .catch(errorResult => console.warn('error permission result: ', errorResult));
    }
  },
};
</script>

<style lang="sass">
  @import '../../assets/scss/font-sizes'
  .area-logo
    display: block
    max-width: 166px

  .camera-wrapper
    position: relative
    width: 100%
    min-height: 260px
    .camera
      width: 100%
      min-height: 260px
      background-color: deepskyblue

    .enable-camera
      position: absolute
      top: calc(50% - 36px)
      left: calc(50% - (160.56px / 2))
      margin-left: 0
      z-index: 1
</style>
