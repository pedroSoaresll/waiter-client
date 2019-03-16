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
        <p class="font-size-md mt-3">
          Aponte a câmera para o <span class="font-weight-bold">QR Code</span> localizado
          próximos a você
        </p>
      </v-flex>

      <!--camera-->

      <!--alert-->
      <v-flex row wrap>
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
  export default {};
</script>

<style lang="sass">
  @import '../../assets/scss/font-sizes'
  .area-logo
    display: block
    max-width: 166px
</style>
