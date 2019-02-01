<template>
  <v-layout column wrap align-center class="layout">
    <v-flex column wrap xs12>
      <v-flex xs12>
        <img :src="require('../../assets/kovi-logo-white.svg')" alt="logo kovi">
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p class="text-uppercase text-peca-ja mt-5 mb-0">Peça já seu Kovi</p>
        <p class="text-a-mudanca">A mudança começa hoje!</p>
      </v-flex>

      <v-form v-model="isValid">
        <v-flex column wrap xs12 class="mt-5">
          <v-text-field
            label="Número do seu celular"
            v-model="phone"
            box
            dark
            :rules="numberRule"
            :counter="11"
            mask="(##) #####-####"
            required
          />
          <v-flex column xs12>
            <v-radio-group v-model="acceptTerms">
              <v-radio color="#FFFFFF" dark value="accept">
                <span slot="label" class="text-termos-uso">
                  Concordo com os
                  <a href="#">Termos de Uso</a> da Kovi
                </span>
              </v-radio>
            </v-radio-group>
          </v-flex>
        </v-flex>

        <v-flex column wrap xs12 class="mt-4">
          <p
            class="error-message"
            v-show="errorMessage"
          >Não foi possível receber seu número, por favor tente mais tarde.</p>
          <v-btn :disabled="sent" @click="createDriver" class="btn-quero-kovi ml-0">Quero um Kovi</v-btn>
        </v-flex>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { CREATE_LEAD } from "../../services/Lead";

export default {
  data: () => ({
    isValid: false,
    errorMessage: false,
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
      if (!this.isValid || !this.acceptTerms) return;
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
          return
        }

        this.$router.push({
          name: "ConfirmNumber"
        })
      }
    );
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
  font-size: 36pt;
  color: #ffffff;
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

/* material edit */
.theme--light.v-icon {
  color: #ffffff !important;
}
</style>
