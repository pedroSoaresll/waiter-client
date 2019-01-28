<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-obrigado mb-0">Pagamento do plano</p>
        <p
          class="text-faca-pagamento text-16px mt-3"
        >Você está quase lá para pegar o seu Kovi. Selecione abaixo a forma de pagamento do seu caução e do seu aluguel.</p>
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold">PAGAMENTO CAUÇÃO (Cartão de Crédito)</p>
        <p class="text-success">Pagamento realizado com sucesso!</p>
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold">PAGAMENTO ALUGUEL (Boleto bancário)</p>
        <p class="text-pink">Aguardando pagamento.</p>

        <v-flex column wrap xs12 align-self-start class="mt-2">
          <v-btn round class="btn-pink ml-0" :large="true">PAGAR BOLETO</v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
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
      date: ""
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
  font-size: 18px;
  opacity: 0.6;
}

.subtitle {
  opacity: 0.6;
  font-size: 18px;
  color: #4a4a4a;
}

.text-success,
.text-pink {
  font-size: 16px;
}

.text-success {
  color: #73BD53;
}

.text-pink {
  color: #FF3859;
}
</style>
