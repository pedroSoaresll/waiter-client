<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-obrigado mb-0">Obrigado!</p>
        <p class="text-para-acelerar text-16px mt-5">
					Agora suas informações estão sendo analisadas pela nossa equipe.
				</p>
        <p class="text-para-acelerar text-16px mt-2">
					<strong> Por favor fique atento ao seu email e telefone</strong>, havendo disponibilidade para a entrega, enviaremos um email com instruções sobre o pagamento do caução e da primeira mensalidade.
          <!-- pois a partir do momento que houver disponibilidade de entrega vamos te enviar um email para você pagar o caução e a primeira mensalidade. -->
				</p>
        <p class="text-para-acelerar text-16px mt-2">
					Um abraço,<br />
					Equipe Kovi
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
	color: #4A4A4A;
}

.text-para-acelerar {
  opacity: 0.6;
}

.subtitle {
  opacity: 0.6;
  font-size: 18px;
  color: #4a4a4a;
}
</style>
