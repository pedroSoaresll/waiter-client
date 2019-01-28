<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-obrigado mb-0">O seu carro está te esperando!</p>
        <p class="text-faca-pagamento text-16px mt-3">
					Faça o pagamento do seu caucao e aluguel para o seu Kovi.
				</p>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-5">
        <v-btn round class="btn-pink" :large="true">PAGAR MINHA LOCAÇÃO</v-btn>
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
	color: #4A4A4A;
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
</style>
