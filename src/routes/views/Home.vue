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
                    próximo a você.</p>
            </v-flex>

            <!--camera-->
            <div class="camera-wrapper" v-if="!cameraNotFound">
                <v-btn :hidden="cameraPermission !== 'prompt'" color="info" class="enable-camera" @click="enableCamera">
                    Habilitar Câmera
                </v-btn>
                <video hidden autoplay ref="video" class="camera"></video>
                <canvas ref="canvas" width="315" height="315"></canvas>
            </div>

            <p v-else class="error--text font-weight-bold text-center mt-4 mb-3">
                Não foi localizado nenhuma câmera em seu dispositivo
                para que possa ser feito a leitura do QR Code.</p>

            <!--alert-->
            <v-flex row wrap class="mt-3">
                <v-alert type="info" :value="true">
                    <p class="font-size-sm">Assim que o QR Code for reconhecido, você será
                        redirecionado para a tela do cardápio do restaurante
                        que você se encontra :)</p>
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import jsQR from 'jsqr';
import MOCK_QRCODE from '../../mocks/qrcode-auth';

export default {
  data: () => ({
    cameraPermission: 'prompt',
    cameraNotFound: false,
    qrScanner: null,
  }),
  methods: {
    enableCamera() {
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
    },

    disableCamera() {
      const { video } = this.$refs;
      video.pause();
    },

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
      if (code) {
        this.disableCamera();
        this.$store.dispatch('client/startSession', code);
      }
    },

    async handlePermissionCamera(permissionStatus) {
      console.log('camera has been called', permissionStatus);
      this.cameraPermission = permissionStatus.state;
      const { video } = this.$refs;
      const parent = video.parentNode;
      const size = parent.offsetWidth;
      video.width = size;
      video.height = size;

      switch (permissionStatus.state) {
        case 'prompt':
        case 'granted':
          navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'environment',
              width: size,
              height: size,
            },
          })
            .then((mediaStream) => {
              video.srcObject = mediaStream;
              video.addEventListener('play', this.handleVideoTimeCallback);
            })
            .catch((error) => {
              if (error.name === 'NotFoundError') this.cameraNotFound = true;
            });
          break;
        case 'denied':
          console.log('user denied the camera');
          break;
        default:
          break;
      }
    },
  },

  mounted() {
    this.$store.dispatch('order/clearOrders');
    this.$store.dispatch('client/logoutSession');

    if (!('navigator' in window)) {
      console.error('your navigator no have support');
    }

    // get qr code mock
    this.$store.dispatch('client/startSession', MOCK_QRCODE);
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
