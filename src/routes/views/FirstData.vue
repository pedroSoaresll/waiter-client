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
      <p class="text-cadastre-agora">Cadastre-se agora e peça já o seu Kovi!</p>
      <p class="text-para-comecar">Para começar, precisamos saber um pouco mais de você :)</p>
    </v-flex>

    <v-form v-model="isValid">
      <v-flex column wrap xs12 class="mt-5">
        <v-text-field
          :rules="dataRule"
          v-model="input.name"
          box
          dark
          label="Nome completo"
          class="input-text"
          required
        />
        <v-text-field
          :rules="dataRule"
          v-model="input.cpf"
          box
          dark
          label="CPF"
          mask="###.###.###-##"
          required
        />
        <v-text-field
          :rules="dataRule"
          v-model="input.email"
          box
          dark
          label="E-mail"
          type="email"
          required
        />
        <v-select
          :rules="dataRule"
          v-model="input.work_city"
          :items="items"
          box
          dark
          label="Cidade que você vai trabalhar"
          required
        />
      </v-flex>
    </v-form>

    <v-flex column wrap xs12 class="mt-4">
      <v-btn :large="true" class="btn-radius ml-0" @click="updateDriver">Avançar</v-btn>
    </v-flex>

    <v-flex column wrap xs12 class="mt-5">
      <p class="text-ja-comecou mb-0">Já começou o cadastro?</p>
      <a
        href="#"
        class="link-clique-aqui font-weight-bold mt-0"
      >Clique aqui e verifique o seu processo.</a>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Item1',
        value: 'item1'
      }
    ],
    input: {
      name: "",
      cpf: "",
      email: "",
      work_city: ""
    },
    isValid: false,
    dataRule: [v => !!v || "Este campo é obrigatório!"]
  }),
  methods: {
    updateDriver() {
      if (this.isValid) {
        this.$store.dispatch("lead/updateDriver", this.input);
      }
    }
  }
};
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

.text-cadastre-agora {
  font-size: 20px;
  color: #ffffff;
}

.text-para-comecar {
  font-size: 16px;
  opacity: 0.6;
  color: #ffffff;
}

.btn-radius {
  border-radius: 22.5pt;
}

.text-ja-comecou,
.link-clique-aqui {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
}

/* material edit */
.theme--light.v-icon {
  color: #ffffff !important;
}
</style>
