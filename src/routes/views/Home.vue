<template>
  <v-layout column wrap align-center class="layout">
    <v-flex column wrap xs12>
      <v-flex xs12>
        <img
          :src="require('../../assets/kovi-logo-white.svg')"
          alt="logo kovi"
        />
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p class="text-uppercase text-peca-ja mt-5 mb-0">Peça já seu Kovi</p>
        <p class="text-a-mudanca">Embarque nessa com a gente!</p>
      </v-flex>

      <v-form v-model="isValid" @submit.prevent="createDriver">
        <v-flex column wrap xs12 class="mt-5">
          <v-text-field
            label="Número do seu celular"
            v-model="phone"
            box
            dark
            :rules="numberRule"
            :counter="11"
            mask="(##) #####-####"
            required></v-text-field>
          <v-flex column xs12>
            <v-checkbox color="#FFFFFF" dark value="true" v-model="acceptTerms">
              <span slot="label" class="text-termos-uso">
                Li e concordo com os
                <a href="https://www.kovi.com.br/termos-de-uso" target="_blank"
                  >Termos de Uso</a
                >
                da Kovi.
              </span>
            </v-checkbox>
          </v-flex>
        </v-flex>

        <v-flex column wrap xs12 class="mt-4">
          <p class="error-message" v-show="errorMessageTermsOrNumber">
            Você precisa digitar um celular válido e estar de acordo com os Termos de Uso da Kovi para continuar.
          </p>
          <p class="error-message" v-show="errorMessage">
            Não foi possível receber seu número, por favor tente mais tarde.
          </p>
          <v-btn
            :disabled="sent"
            @click="createDriver"
            class="btn-quero-kovi ml-0"
            >Quero um Kovi</v-btn
          >
        </v-flex>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    isValid: false,
    errorMessage: false,
    errorMessageTermsOrNumber: false, //alterado
    sent: false,
    phone: "",
    numberRule: [
      v => !!v || "Número de celular é obrigatorio!",
      v => `${v}`.length === 11 || "O número deve ter 11 dígitos com DD."
    ],
    driverUnwatch: null,
    stepsUnwatch: null,
    acceptTerms: false
  }),
  methods: {
    createDriver() {
      if (!this.isValid || !this.acceptTerms) {
        this.errorMessageTermsOrNumber = true; //alterado
        return
      }
      this.errorMessageTermsOrNumber = false; //alterado
      this.errorMessage = false;
      this.sent = true;
      this.$store.dispatch("lead/createDriver", this.phone);
    }
  },
  mounted() {
    // watch steps data
    this.stepsUnwatch = this.$store.watch(
      state => {
        return state.lead.steps;
      },
      value => {
        const { invalid } = value.GET_PHONE;
        if (invalid) {
          // show error to user
          this.sent = false;
          this.errorMessage = true;
          // this.errorMessageTermsOrNumber = true;
          return;
        }

        this.$router.push({
          name: "ConfirmNumber",
          params: {
            code2fa: true
          }
        });
      }
    );

    // remove cache from local storage
    localStorage.removeItem('kovi-signup');
    sessionStorage.removeItem('kovi_code2fa');
    sessionStorage.removeItem('kovi_phone');
  },

  beforeDestroy() {
    if (this.stepsUnwatch) this.stepsUnwatch();
  }
};
</script>

<style scoped>
.layout {
  background-color: #ff3859;
  padding: 30px 20px;
}

.text-peca-ja {
  font-size: 20pt;
  color: #ffffff;
}

.text-a-mudanca {
  font-size: 32pt;
  color: #ffffff;
  line-height: 1.2;
}

.text-termos-uso {
  font-size: 12pt;
  color: #ffffff;
}

.btn-quero-kovi {
  border-radius: 22.5pt;
}

.error-message {
  color: #ffffff;
}

</style>
