<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">
        <img style="margin: 0 auto" src="../assets/99.png">
      </v-card-title>
      <v-card-text>Informe os 6 primeiros digitos do cartao da 99 e os 4 ultimos
        <v-form v-model="valid">
          <div class="text-xs-center">
            <v-dialog v-model="verify" hide-overlay persistent width="300">
              <v-card color="primary" dark>
                <v-card-text>Acessando 99
                  <v-progress-linear indeterminate color="#ff3859" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
          <v-layout>
            <v-flex xs12 md12>
              <v-text-field
                color="#ff3859"
                clearable
                v-model="cardbegin"
                :rules="cardbeginRules"
                :counter="6"
                label="6 primeiros digitos"
                required
              ></v-text-field>
              <v-text-field
                color="#ff3859"
                clearable
                v-model="cardend"
                :rules="cardendRules"
                :counter="4"
                label="4 ultimos digitos"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-layout column wrap align-center v-show="errorMessage">
        <p class="error-message">Não foi possível realizar a integraçao, verifique as credenciais e tente novamente.</p>
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="closeModal">Fechar</v-btn>
        <v-btn color="green darken-1" flat @click="send99">Conectar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { LOGIN_99 } from "../services/Lead";
import { theme } from "../plugins/vuetify";

export default {
  name: "Login99",
  props: {
    dialog: Boolean
  },
  model: {
    prop: "dialog",
    event: "change"
  },
  data: () => ({
    valid: false,
    verify: false,
    errorMessage: false,
    cardbegin: null,
    step: "5",
    success: false,
    cardend: null,
    cardbeginRules: [
      v => !!v || "Os 6 primeiros números são obrigatorios!",
      v => `${v}`.length === 6 || "O número deve ter 6 dígitos."
    ],
    cardendRules: [
      v => !!v || "Os 4 últimos números são obrigatorios!",
      v => `${v}`.length === 4 || "O número deve ter 4 dígitos."
    ]
  }),
  computed: {
    driver() {
      return this.$store.getters["lead/driver"];
    }
  },
  methods: {
    closeModal() {
      this.valid = false
      this.verify = false
      this.errorMessage = false
      this.cardbegin = null
      this.step = "5"
      this.success = false
      this.cardend = null
      this.dialog = this.$emit('change', false)
    },
    send99(val) {
      this.verify = true;
      this.errorMessage = false;

      if (!val) return;
      if (!this.valid) {
        //this.$store.commit('lead/setSteps', {GET_PHONE: { complete: false, invalid: true}});
        this.verify = false;
        return false;
      }

      this.$apollo
        .mutate({
          mutation: LOGIN_99,
          variables: {
            phone: this.driver.phone_number,
            driver: this.driver.id,
            code2fa: this.driver.code2fa,
            username: this.driver.name,
            cardend: this.cardend,
            cardbegin: this.cardbegin
          }
        })
        .then(result => {
          if (result.data.updateLead.id !== undefined) {
            this.success = true;
            this.verify = false;
            this.dialog = false;
            /*this.$store.commit("lead/setSteps", {
              COMPLETE_INFO_APPS: { complete: true, invalid: false }
            });*/
            this.$emit("change", false);
            this.$emit('integrate', true)
          }
        })
        .catch(error => {
          this.$store.commit("lead/setStep", this.step);
          this.$store.commit("lead/setSteps", {
            COMPLETE_INFO_APPS: { complete: false, invalid: true }
          });
          this.verify = false;
          this.errorMessage = true;
          this.$emit('integrate', false)
          console.error(error);
        });
    },
    isValid() {
      return this.valid;
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  text-align: center;
}
</style>
