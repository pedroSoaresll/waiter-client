<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-qual-empresa mb-0">Qual empresa de mobilidade você trabalha hoje?</p>
        <p
          class="text-para-acelerar text-16px mt-2"
        >Para acelerar o seu aluguel, precisamos saber para qual empresa de mobilidade você trabalha.</p>
      </v-flex>

      <v-flex column wrap xs12>
        <v-checkbox class="area-checkbox" label="Uber"/>
        <v-checkbox class="area-checkbox" label="99"/>
        <v-checkbox class="area-checkbox" label="Cabify"/>
        <v-checkbox class="area-checkbox" label="Lady Driver"/>
        <v-checkbox class="area-checkbox" label="Outros"/>
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p>Você possui garagem na sua casa ou alugada para guardar o carro?</p>
        <v-checkbox class="text-18px" label="Sim, possuo garagem na minha casa ou alugada"/>
      </v-flex>

      <v-flex column wrap xs12>
        <p>Você possui menos de 13 pontos na sua CNH?</p>
        <v-checkbox class="text-18px" label="Sim, possuo menos de 13 pontos na minha CNH."/>
      </v-flex>

      <v-flex column wrap xs12>
        <p>Você possui mais de 21 anos?</p>
        <v-checkbox class="text-18px" label="Sim, possuo mais de 21 anos."/>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-3">
        <v-btn class="btn-radius btn-pink" large="true">Avançar</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

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

.text-para-acelerar {
	opacity: .6;
}
</style>
