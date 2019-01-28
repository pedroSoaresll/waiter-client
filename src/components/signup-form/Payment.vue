<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-container row wrap grid-list-md xs12 class="wrapper">
      <v-layout row wrap>
        <v-flex column wrap xs12>
          <p class="text-obrigado mb-0">Pagamento do plano</p>
          <p
            class="text-faca-pagamento text-16px mt-3"
          >Você está quase lá para pegar o seu Kovi. Selecione abaixo a forma de pagamento do seu caução e do seu aluguel.</p>
        </v-flex>

        <v-flex column wrap xs12 class="mt-4">
          <p class="subtitle font-weight-bold text-uppercase">PAGAMENTO CAUÇÃO</p>
          <v-radio-group v-model="form.caucaoPaymentMethod">
            <v-radio label="Boleto Bancário" value="boleto"/>
            <v-radio label="Cartão de Crédito" value="cartao-credito"/>
          </v-radio-group>

          <!-- area cartão de crédito -->
          <v-flex column wrap xs12 v-if="form.caucaoPaymentMethod === 'cartao-credito'">
            <v-text-field box label="Número do Cartão"/>
            <v-text-field box label="Nome do Titular"/>
            <v-text-field box label="CPF do Titular"/>

            <v-layout row wrap grid-list-xs>
              <v-flex column wrap xs8>
                <v-text-field box label="Vencimento"/>
              </v-flex>

              <v-flex column wrap xs4>
                <v-text-field box label="CVV"/>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>

        <v-flex column wrap class="mt-4">
          <p class="subtitle font-weight-bold text-uppercase">PAGAMENTO ALUGUEL</p>
          <v-radio-group v-model="form.weekPaymentMethod">
            <v-radio label="Boleto Bancário" value="boleto"/>
            <v-radio label="Cartão de Crédito" value="cartao-credito"/>
          </v-radio-group>

          <!-- area cartão de crédito -->
          <v-flex column wrap xs12 v-if="form.weekPaymentMethod === 'cartao-credito'">
            <v-text-field box label="Número do Cartão"/>
            <v-text-field box label="Nome do Titular"/>
            <v-text-field box label="CPF do Titular"/>

            <v-layout row wrap grid-list-xs>
              <v-flex column wrap xs8>
                <v-text-field box label="Vencimento"/>
              </v-flex>

              <v-flex column wrap xs4>
                <v-text-field box label="CVV"/>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>
      </v-layout>

      <!-- button avançar -->
      <v-layout column wrap xs12 class="mt-3">
        <v-flex column wrap xs12 align-self-center>
          <v-btn round class="btn-pink" :large="true">Avançar</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { theme } from "../../plugins/vuetify";

export default {
  data: () => ({
    newTheme: {
      ...theme,
      primary: "#ff3859"
    },
    modal: false,
    form: {
      garageOtherAddress: false,
      date: "",
      caucaoPaymentMethod: "",
      weekPaymentMethod: ""
    }
  }),
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

.text-obrigado {
  font-size: 30px;
  color: #4a4a4a;
  line-height: 39px;
}

.text-faca-pagamento {
  font-size: 16px;
  opacity: 0.6;
}

.subtitle {
  opacity: 0.6;
  font-size: 18px;
  color: #4a4a4a;
}
</style>
