<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-qual-empresa mb-0">Informações pessoais</p>
        <p
          class="text-para-acelerar text-16px mt-2"
        >Agora precisamos receber uma cópia da sua CNH e saber onde você mora.</p>
      </v-flex>

      <!-- form / cnh -->
      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold">CNH</p>
        <v-text-field clearable label="Número da CNH"/>
        <upload-input title="Foto da CNH" :file-changed-callback="uploadCNH"/>
      </v-flex>

      <!-- contatos de emergencia -->
      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase">CONTATOS DE EMERGENCIA</p>
        <v-text-field clearable label="Nome do contato 1"/>
        <v-text-field clearable label="Telefone do contato 1"/>
        <v-text-field clearable label="Nome do contato 2"/>
        <v-text-field clearable label="Telefone do contato 2"/>
      </v-flex>

      <!-- address -->
      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase">ENDEREÇO DE RESIDÊNCIA</p>
        <v-text-field clearable label="CEP"/>
        <v-text-field clearable label="Nome da Rua"/>
        <v-text-field clearable label="Número da casa/apartamento"/>
        <v-text-field clearable label="Complemento (Apt, Sala, etc...)"/>
        <v-text-field clearable label="Cidade"/>
        <v-text-field clearable label="Estado"/>
        <upload-input title="Foto do comprovante residência" :file-changed-callback="uploadCNH"/>
        <v-checkbox v-model="form.garageOtherAddress" label="Minha garagem fica em outro endereço"/>
      </v-flex>

      <!-- garage if other address -->
      <v-flex column wrap xs12 class="mt-5" v-if="form.garageOtherAddress">
        <p class="subtitle font-weight-bold text-uppercase">ENDEREÇO DA GARAGEM</p>
        <v-text-field clearable label="CEP"/>
        <v-text-field clearable label="Nome da Rua"/>
        <v-text-field clearable label="Número da casa/apartamento"/>
        <v-text-field clearable label="Complemento (Apt, Sala, etc...)"/>
        <v-text-field clearable label="Cidade"/>
        <v-text-field clearable label="Estado"/>
        <upload-input title="Foto do comprovante residência" :file-changed-callback="uploadCNH"/>
        <v-checkbox v-model="form.garageOtherAddress" label="Minha garagem fica em outro endereço"/>
      </v-flex>

      <!-- proof garage -->
      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase mb-0">ENDEREÇO DA GARAGEM</p>
        <upload-input title="Foto da garagem" :file-changed-callback="uploadCNH"/>
        <p class="subtitle">Por favor, bata uma foto legível e que apareça outras casas do lado.</p>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-3">
        <v-btn class="btn-radius btn-pink" :large="true">Avançar</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { theme } from "../../plugins/vuetify";
import UploadInput from "../UploadInput";

export default {
  components: {
    UploadInput
  },
  data: () => ({
    newTheme: {
      ...theme,
      primary: "#ff3859"
    },
    form: {
      garageOtherAddress: false
    }
  }),
  methods: {
    uploadCNH() {}
  },
  mounted() {
    this.$vuetify.theme = this.newTheme;
  },
  beforeDestroy() {
    this.$vuetify.theme = theme;
  }
};
</script>


<style scoped>
.wrapper {
  background-color: #ffffff;
  padding: 30px 20px;
}

.area-checkbox {
  height: 20px;
}

.step1 {
  font-size: 20px;
}

.text-16px {
  font-size: 16px;
}

.text-18px {
  font-size: 18px;
}

.btn-radius {
  border-radius: 22.5pt;
}

.btn-pink {
  background-color: #ff3859 !important;
  color: #ffffff;
}

.text-para-acelerar {
  opacity: 0.6;
}

.subtitle {
  opacity: 0.6;
  font-size: 16px;
  color: #4a4a4a;
}
</style>
