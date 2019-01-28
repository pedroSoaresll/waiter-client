<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-obrigado mb-0">Data de retirada</p>
      </v-flex>

      <v-flex column wrap xs12 class="mt-4">
        <p class="text-faca-pagamento text-16px mt-3">Obrigado por aluguar com a Kovi!</p>
        <p class="text-faca-pagamento text-16px mt-3">
          O seu carro estará disponível no dia 22/01/2019 na Rua Tavares Cabral, 209,
          <strong>na parte da manha</strong>
        </p>
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
  color: #73bd53;
}

.text-pink {
  color: #ff3859;
}
</style>
