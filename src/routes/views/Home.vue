<template>
  <v-layout column wrap class="layout">
    <v-flex xs12>
      <img :src="require('../../assets/kovi-logo-white.svg')" alt="logo kovi">
    </v-flex>

    <v-flex column wrap xs12 class="mt-5">
      <p class="text-uppercase text-peca-ja mt-5 mb-0">Peça já seu Kovi</p>
      <p class="text-a-mudanca">A mudança começa hoje!</p>
    </v-flex>

    <v-flex column wrap xs12 class="mt-5">
      <v-text-field label="Número do seu celular" box/>
      <v-flex column xs12>
        <v-radio color="#FFFFFF">
          <span slot="label" class="text-termos-uso">
            Concordo com os
            <a href="#">Termos de Uso</a> da Kovi
          </span>
        </v-radio>
      </v-flex>
    </v-flex>

    <v-flex column wrap xs12 class="mt-4">
      <v-btn class="btn-quero-kovi ml-0">Quero um Kovi</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
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

/* material edit */
.theme--light.v-icon {
  color: #ffffff !important;
}
</style>
