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

      <div v-for="account of accounts" :key="account.appName">
        <v-dialog width="500" v-model="account.modal" v-if="!account.integration">
          <v-card class="wrapper">
            <v-layout column wrap>
              <p class="text-envie-historico">
                Por favor, envie o seu histórico de corridas
                <strong>{{ account.appName === 'Outros' ? 'do outro aplicativo que você usa' : `${account.appName}` }}</strong>
              </p>
              <upload-input
                title="Foto do perfil"
                :file-changed-callback="file => imageFile = file.imageFile"
              ></upload-input>

              <v-flex align-self-center row wrap xs12>
                <p
                  class="error-message text-center"
                  v-show="account.errorMessage"
                >{{account.textErrorMessage}}</p>
              </v-flex>

              <v-btn
                :disabled="account.sent"
                round
                class="btn-pink"
                :large="true"
                @click="uploadImage(account)"
              >Salvar</v-btn>
              <v-flex column wrap xs12 align-self-center>
                <v-btn
                  :disabled="account.sent"
                  flat
                  small
                  :large="true"
                  @click="closeModal(account)"
                >Cancelar</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>

        <!--integração 99 modal-->
        <login99 v-if="account.documentType === 'app_99'" v-model="account.modal" @integrate="integrate => account.status = integrate"/>
      </div>

      <v-layout column wrap xs8 align-self-center class="mt-3" v-show="errorNextStep">
        <p class="error-message">Para avançar é necessário adicionar todas as contas.</p>
      </v-layout>

      <v-flex column wrap xs12 align-self-center class="mt-3">
        <v-btn round class="btn-pink" :large="true" @click="nextStep">Avançar</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import UploadInput from "../UploadInput";
import Login99 from "../Login99";
export default {
  components: {
    UploadInput,
    Login99
  },
  data: () => ({
    teste: null,
    imageFile: null,
    errorNextStep: false,
    accounts: [
      {
        appName: "Uber",
        status: null,
        modal: false,
        documentType: "app_uber",
        sent: false,
        errorMessage: false,
        textErrorMessage: "",
        integration: false
      },
      {
        appName: "99",
        status: null,
        modal: false,
        documentType: "app_99",
        sent: false,
        errorMessage: false,
        textErrorMessage: "",
        integration: true
      },
      {
        appName: "Cabify",
        status: null,
        modal: false,
        documentType: "app_cabify",
        sent: false,
        errorMessage: false,
        textErrorMessage: "",
        integration: false
      },
      {
        appName: "Lady Driver",
        status: null,
        modal: false,
        documentType: "app_ladydriver",
        sent: false,
        errorMessage: false,
        textErrorMessage: "",
        integration: false
      },
      {
        appName: "Outros",
        status: null,
        modal: false,
        documentType: "app_outros",
        sent: false,
        errorMessage: false,
        textErrorMessage: "",
        integration: false
      }
    ]
  }),
  methods: {
    textButton(appName, status) {
      switch (status) {
        case true:
          return `Conta ${appName} adicionada!`;

        case false:
          return `Conta ${appName} não adicionada`;

        default:
          return `Adicionar conta ${appName}`;
      }
    },
    colorButton(status) {
      switch (status) {
        case true:
          return `success`;

        case false:
          return `error`;

        default:
          return `gray`;
      }
    },

    updateAccountsState() {
      this.$store.commit("lead/setAccounts", this.accounts);
    },
    uploadImage(account) {
      account.errorMessage = false;

      if (!this.imageFile) {
        account.errorMessage = true;
        account.textErrorMessage = "Você deve selecionar um comprovante";
        this.updateAccountsState();
        return;
      }

      account.sent = true;

      this.$store
        .dispatch("lead/uploadDoc", {
          documentType: account.documentType,
          file: this.imageFile
        })
        .then(() => {
          this.errorNextStep = false;
          account.status = true;
          this.closeModal(account);
        })
        .catch(errorMessage => {
          account.textErrorMessage = errorMessage;
          account.errorMessage = true;
          account.status = false;
          account.sent = false;
          this.updateAccountsState();
        });
    },
    closeModal(account) {
      // this.imageFile = null
      account.modal = !account.modal;
      account.errorMessage = false;
      account.textErrorMessage = "";
      this.updateAccountsState();
    },
    nextStep() {
      this.errorNextStep = false;

      const linkedAccount = this.accounts.filter(item => !item.status);

      if (!linkedAccount.length) this.$router.push({ name: "ReportDocs" });
      else {
        this.errorNextStep = true;
      }
    }
  },
  mounted() {
    const driver = this.$store.getters["lead/driver"];
    const accounts = [].concat(this.$store.getters["lead/accounts"]);
    if (accounts.length) this.accounts = accounts;
    this.accounts = this.accounts.filter(item => {
      if (driver.survey_app_99 === 1 && item.documentType === "app_99")
        return true;
      if (driver.survey_app_uber === 1 && item.documentType === "app_uber")
        return true;
      if (driver.survey_app_cabify === 1 && item.documentType === "app_cabify")
        return true;
      if (
        driver.survey_app_lady_driver === 1 &&
        item.documentType === "app_ladydriver"
      )
        return true;
      if (driver.survey_app_others === 1 && item.documentType === "app_outros")
        return true;

      return false;
    });

    this.updateAccountsState();
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

.error-message {
  color: #ff3859;
  font-size: 16px;
  text-align: center;
}

.text-envie-historico {
  font-size: 20px;
}
</style>
