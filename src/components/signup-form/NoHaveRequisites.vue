<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <v-flex column wrap xs12 class="wrapper">
      <p>Infelizmente, não foi possível aprovar o seu cadastro por conta dos pré requisitos mínimos para alugar um KOVI.</p>
      <p>Entendemos que isso pode ser frustrante e estamos diariamente aperfeiçoando nossos modelos de análise e testando comportamentos de clientes com diversos perfis.</p>
      <p>No futuro, pode ser que nossa análise tenha evoluído o bastante para te liberar um KOVI.</p>
      <p>O ideal é esperar ao menos 3 meses e, se ainda tiver interesse em alugar um KOVI, pedir uma nova análise.</p>
      <p>Obrigado pela compreensão!</p>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.wrapper {
  background-color: #ffffff;
  padding: 30px 20px;
}
p {
  font-size: 16px;
}
</style>
