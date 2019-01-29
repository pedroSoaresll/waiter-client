<template>
  <v-layout column wrap class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-qual-empresa mb-0">Conecte suas contas</p>
        <p
          class="text-para-acelerar text-16px mt-2"
        >Conectando suas contas você garante prioridade para o recebimento do seu carro, é super simples ;)</p>
      </v-flex>

      <v-flex row wrap xs8 align-self-center>
        <v-btn
          v-for="account of accounts"
          :key="account.appName"
          block
          round
          outline
          :color="colorButton(account.status)"
          class="mt-4"
          :large="true"
          @click="account.modal = !account.modal"
        >{{ textButton(account.appName, account.status) }}</v-btn>
      </v-flex>

      <v-dialog
        width="500"
        v-for="account of accounts"
        :key="account.appName"
        v-model="account.modal"
      >
        <v-card class="wrapper">
          <v-layout column wrap>
            <p class="text-envie-historico">
              Por favor, envie o seu histórico de corridas
              <strong>{{ account.appName === 'Outros' ? 'do outro aplicativo que você usa' : `${account.appName}` }}</strong>
            </p>
            <upload-input title="Foto do perfil" :file-changed-callback="file => cImageFile = file.imageFile"></upload-input>
            <v-btn round class="btn-pink" :large="true" @click="uploadImage">Salvar</v-btn>
            <v-flex column wrap xs12 align-self-center>
              <v-btn flat small :large="true" @click="closeModal(account)">Cancelar</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>

      <v-flex column wrap xs12 align-self-center class="mt-3">
        <v-btn round class="btn-pink" :large="true">Avançar</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import UploadInput from "../UploadInput";
export default {
  components: {
    UploadInput
  },
  data: () => ({
    teste: null,
    imageFile: null,
    accounts: [
      {
        appName: "Uber",
        status: null,
        modal: false,
        documentType: 'APP_UBER'
      },
      {
        appName: "99",
        status: null,
        modal: false,
        documentType: 'APP_99'
      },
      {
        appName: "Cabify",
        status: null,
        modal: false,
        documentType: 'APP_CABIFY'
      },
      {
        appName: "Lady Driver",
        status: null,
        modal: false,
        documentType: 'APP_LADYDRIVER'
      },
      {
        appName: "Outros",
        status: null,
        modal: false,
        documentType: 'APP_OUTROS'
      }
    ]
  }),
  computed: {
    cImageFile: {
      get() {
        return this.imageFile
      },
      set(obj) {
        this.imageFile = obj
      }
    }
  },
  methods: {
    textButton(appName, status) {
      switch (status) {
        case true:
          return `Conta ${appName} adicionada!`;
          break;

        case false:
          return `Conta ${appName} não adicionada`;

        default:
          return `Adicionar conta ${appName}`;
          break;
      }
    },
    colorButton(status) {
      switch (status) {
        case true:
          return `success`;
          break;

        case false:
          return `error`;

        default:
          return `gray`;
          break;
      }
    },
    uploadImage(image) {
      console.log('iamgem recebida:: ', this.imageFile)
      
    },
    closeModal(account) {
      // this.imageFile = null
      account.modal = !account.modal
    }
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

.btn-pink {
  background-color: #ff3859 !important;
  color: #ffffff;
}

.text-para-acelerar {
  opacity: 0.6;
}

.text-envie-historico {
  font-size: 20px;
}
</style>
