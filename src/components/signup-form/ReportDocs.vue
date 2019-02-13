<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi" />
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-qual-empresa mb-0">Informações pessoais</p>
        <p class="text-para-acelerar text-16px mt-2">
          Agora precisamos receber uma cópia da sua CNH e saber onde você mora.
        </p>
      </v-flex>

      <!-- form / cnh -->
      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold">CNH</p>
        <v-text-field
          @blur="updateDriver"
          clearable
          label="Número da CNH"
          v-model="input.license_number"
          mask="###########"
        />
        <upload-input
          title="Foto da CNH"
          :file-changed-callback="
            file => uploadDoc(file.imageFile, 'cnh_photo')
          "
        />
        <p class="subtitle">
          Por favor, tire uma foto nítida em que seja possível ler as informações da CNH.
        </p>
      </v-flex>

      <!-- contatos de emergencia -->
      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase">
          CONTATOS DE EMERGENCIA
        </p>
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.emergency_1_name"
          label="Nome do contato 1"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.emergency_1_phone_number"
          label="Telefone do contato 1"
          mask="(##) #####-####"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.emergency_2_name"
          label="Nome do contato 2 (opcional)"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.emergency_2_phone_number"
          label="Telefone do contato 2 (opcional)"
          mask="(##) #####-####"
        />
      </v-flex>

      <!-- address -->
      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase">
          ENDEREÇO DE RESIDÊNCIA
        </p>
        <v-text-field
          @blur="updateDriver, getCep(input.address_postal_code)"
          clearable
          v-model="input.address_postal_code"
          label="CEP"
          mask="#####-###"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.address_street_name"
          label="Nome da Rua"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.address_street_number"
          label="Número da casa/apartamento"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.address_street_details"
          label="Complemento (Apt, Sala, etc...)"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.address_city"
          label="Cidade"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          v-model="input.address_state"
          label="Estado"
          mask="AA"
        />

        <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase mb-0">
          FOTO DO COMPROVANTE DE RESIDÊNCIA
          <!-- COMPROVANTE DE RESIDENCIA -->
        </p>
        <upload-input
          title="Foto do comprovante residência"
          :file-changed-callback="
            file => uploadDoc(file.imageFile, 'address_photo')
          "
        />
        <p class="subtitle">
          Por favor, tire uma foto nítida em que seja possível ler as informações do comprovante.
        </p>
      </v-flex>



        <!-- <v-checkbox v-model="garageOtherAddress" label="Minha garagem fica em outro endereço"/> -->
      </v-flex>

      <!-- garage if other address -->
      <v-flex column wrap xs12 class="mt-5" v-if="garageOtherAddress">
        <p class="subtitle font-weight-bold text-uppercase">
          ENDEREÇO DA GARAGEM
        </p>
        <v-text-field @blur="updateDriver" clearable label="CEP" />
        <v-text-field @blur="updateDriver" clearable label="Nome da Rua" />
        <v-text-field
          @blur="updateDriver"
          clearable
          label="Número da casa/apartamento"
        />
        <v-text-field
          @blur="updateDriver"
          clearable
          label="Complemento (Apt, Sala, etc...)"
        />
        <v-text-field @blur="updateDriver" clearable label="Cidade" />
        <v-text-field @blur="updateDriver" clearable label="Estado" />
        <upload-input
          title="Foto do comprovante endereço"
          :file-changed-callback="
            file => uploadDoc(file.imageFile, 'garage_photo')
          "
        />
        <v-checkbox
          v-model="garageOtherAddress"
          label="Minha garagem fica em outro endereço"
        />
      </v-flex>

  

      <!-- proof garage -->
      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase mb-0">
          FOTO DA SUA GARAGEM
          <!-- ENDEREÇO DA GARAGEM -->
        </p>
        <upload-input
          title="Foto da garagem"
          :file-changed-callback="
            file => uploadDoc(file.imageFile, 'garage_photo')
          "
        />
        <p class="subtitle">
          Por favor, tire uma foto nítida e que apareçam também as casas do lado.
        </p>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-3">
        <v-btn
          :disabled="!enableNextStep"
          class="btn-radius btn-pink"
          :large="true"
          @click="$router.push({ name: 'SelectPlan' })"
          >Avançar</v-btn
        >
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
    garageOtherAddress: false,
    input: {
      address_street_name: "",
      address_street_number: "",
      address_neighborhood: "",
      address_city: "",
      address_state: "",
      address_postal_code: "",
      address_street_details: "",
      license_number: "",
      emergency_1_name: "",
      emergency_1_phone_number: "",
      emergency_2_name: "",
      emergency_2_phone_number: ""
    }
  }),
  computed: {
    enableNextStep() {
      const steps = this.$store.getters["lead/steps"];
      const { complete } = steps.SEND_DOCUMENTS;
      return complete;
    }
  },
  methods: {
    async getCep(cep) {
      if (!cep || cep.length < 8) return false;

      try {
        const addressData = await fetch(
          `https://viacep.com.br/ws/${cep}/json/`
        ).then(response => response.json());

        this.input.address_street_name = addressData.logradouro;
        this.input.address_neighborhood = addressData.bairro;
        this.input.address_city = addressData.localidade;
        this.input.address_state = addressData.uf;
        this.input.address_street_details = addressData.complemento;
      } catch (e) {
        // console.log("error to get cep::", e);
      }
    },
    updateDriver(/* ref */) {
      this.$store.dispatch("lead/sendDocs", this.input);
    },
    uploadDoc(file, documentType) {
      if (!file || !documentType) return false;

      this.$store.dispatch("lead/uploadDoc", {
        documentType,
        file
      });
    }
  },
  mounted() {
    this.$vuetify.theme = this.newTheme;
    const driver = this.$store.getters["lead/driver"];

    if (!driver) return;
    this.input.address_street_name = driver.address_street_name;
    this.input.address_street_number = driver.address_street_number;
    this.input.address_neighborhood = driver.address_neighborhood;
    this.input.address_city = driver.address_city;
    this.input.address_state = driver.address_state;
    this.input.address_postal_code = driver.address_postal_code;
    this.input.address_street_details = driver.address_street_details;
    this.input.license_number = driver.license_number;
    this.input.emergency_1_name = driver.emergency_1_name;
    this.input.emergency_1_phone_number = driver.emergency_1_phone_number.substr(-11);
    this.input.emergency_2_name = driver.emergency_2_name;
    this.input.emergency_2_phone_number = driver.emergency_2_phone_number.substr(-11);
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
