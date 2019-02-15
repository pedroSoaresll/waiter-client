<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <v-flex column wrap xs12 class="wrapper">
      <p> O seu cadastro não atendeu aos pré requisitos mínimos para alugar um KOVI. </p>
      <p> Fique tranquilo, estamos diariamente aperfeiçoando nossos modelos de análise e testando comportamentos de clientes com diversos perfis.</p>
      <p> O ideal é esperar ao menos 3 meses e, se ainda tiver interesse em alugar um KOVI, pedir uma nova análise.</p>
      <p> Ficamos felizes pelo seu interesse e esperamos que logo possamos fechar uma parceria! Se tiver qualquer dúvida e só chamar.</p>
      <p> Obrigado pela compreensão.</p>

      <p> Grande abraço, </p>
      <p> Equipe Kovi </p>
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
