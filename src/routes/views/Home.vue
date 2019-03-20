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
        <v-btn @click="initQrScanner"
               :hidden="cameraPermission !== 'prompt'"
               color="info" class="enable-camera">Habilitar Câmera</v-btn>
        <video muted playsinline class="camera" ref="camera"></video>
      </div>

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
import QrScanner from 'qr-scanner/qr-scanner.min';

QrScanner.WORKER_PATH = '/js/qrscanner-worker.min.js';

export default {
  data: () => ({
    cameraPermission: 'prompt',
    qrScanner: null,
  }),
  methods: {
    initQrScanner() {
      console.log(this.$refs.camera);
      this.qrScanner = new QrScanner(this.$refs.camera, (result) => {
        console.log('result decoder: ', result);
      }).start();
    },

    async handlePermissionCamera(permissionStatus) {
      console.log('camera has been called', permissionStatus);
      switch (permissionStatus.state) {
        case 'prompt':
          console.log('permission is prompt');
          break;
        case 'granted':
          console.log('user enabled the camera');
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
