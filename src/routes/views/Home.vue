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
          próximos a você </p>
      </v-flex>

      <!--camera-->
      <video class="camera" ref="camera"></video>

      <!--alert-->
      <v-flex row wrap class="mt-5">
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
export default {
  mounted: function () {
    if ('navigator' in window) {
      // have navigator property
      navigator.permissions.query({ name: 'camera' })
        .then((permissionStatus) => {
          console.log('camera permission status: ', permissionStatus.state);
          permissionStatus.onchange = function () {
            console.log('camera permission have a change: ', this.state);
          };
        })
        .catch(errorResult => console.warn('error permission result: ', errorResult));

      navigator.mediaDevices.getUserMedia({
        video: {
          width: window.innerWidth,
          height: window.innerWidth,
          facingMode: 'environment',
        },
      })
        .then((mediaStream) => {
          console.log(mediaStream);
          const { camera } = this.$refs;
          camera.srcObject = mediaStream;
          camera.onloadedmetadata = function () {
            camera.play();
          };
        })
        .catch(errorMediaStream => console.error('error media stream: ', errorMediaStream.name));
    }
  },
};
</script>

<style lang="sass">
  @import '../../assets/scss/font-sizes'
  .area-logo
    display: block
    max-width: 166px

  .camera
    width: 100%
</style>
