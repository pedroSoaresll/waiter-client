<template>
  <v-layout column wrap align-center class="layout">
    <v-flex column wrap xs12>
      <v-flex xs12>
        <img
          :src="require('../../assets/kovi-logo-white.svg')"
          alt="logo kovi"
        />
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p class="text-uppercase text-peca-ja mt-5 mb-0">Peça já seu Kovi</p>
        <p class="text-a-mudanca">Embarque nessa com a gente!</p>
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <!-- <p class="text-cadastre-agora">
          Cadastre-se agora e peça já o seu Kovi!
        </p> -->
        <p class="text-para-comecar">
          Para começar, precisamos saber um pouco mais sobre você <i class="far fa-grin-wink error-messag"></i>
        </p>
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
            color="#FFFFFF"
            dark
            label="Cidade que você vai trabalhar"
            required
          />
        </v-flex>
      </v-form>

      <v-flex column wrap xs12 class="mt-4">
        <p class="error-message" v-show="errorMessage">
          Ops! Não foi possível atualizar suas informações. Por favor, tente
          novamente mais tarde.
        </p>
        <v-btn
          :disabled="sent"
          :large="true"
          class="btn-radius ml-0"
          @click="updateDriver"
          >Avançar</v-btn
        >
      </v-flex>

      <!-- <v-flex column wrap xs12 class="mt-5">
        <p class="text-ja-comecou mb-0">Já começou o cadastro?</p>
        <a
          @click.prevent="verifyRegister"
          class="link-clique-aqui font-weight-bold mt-0"
        >Clique aqui e verifique o seu processo.</a>
      </v-flex> -->
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    sent: false,
    errorMessage: false,
    items: [
      { text: "Grande São Paulo", value: "SAO_PAULO" },
      { text: "Belo Horizonte", value: "BELO_HORIZONTE" },
      { text: "Brasília", value: "BRASILIA" },
      { text: "Curitiba", value: "CURITIBA" },
      { text: "Florianópolis", value: "FLORIANOPOLIS" },
      { text: "Porto Alegre", value: "PORTO_ALEGRE" },
      { text: "Ribeirão Preto", value: "RIBEIRAO_PRETO" },
      { text: "Rio de Janeiro", value: "RIO_DE_JANEIRO" },
      { text: "São José dos Campos", value: "SJC" },
      { text: "Outras", value: "OTHERS" }
    ],
    input: {
      name: "",
      cpf: "",
      email: "",
      work_city: ""
    },
    isValid: false,
    dataRule: [v => !!v || "Este campo é obrigatório!"],
    stepsUnwatch: null
  }),
  computed: {
    driver() {
      return this.$store.getters["lead/driver"];
    }
  },
  methods: {
    updateDriver() {
      this.errorMessage = false;
      if (this.isValid) {
        this.sent = true;
        this.$store.dispatch("lead/sendGetBasics", this.input);
      }
    },
    verifyRegister() {
      this.$parent.$options.parent.loadUserData(this.driver);
    }
  },
  mounted() {
    if (this.driver) {
      this.input.name = this.driver.name;
      this.input.cpf = this.driver.cpf;
      this.input.email = this.driver.email;
      this.input.work_city = this.driver.work_city;
    }

    // watch steps data
    this.stepsUnwatch = this.$store.watch(
      state => {
        return state.lead.steps;
      },
      value => {
        const { complete, invalid } = value.GET_BASIC;
        if (invalid) {
          // show error to user
          this.sent = false;
          this.errorMessage = true;
        } else if (complete) {
          this.$router.push({ name: "PreData" });
        }
      }
    );
  },
  beforeDestroy() {
    if (this.stepsUnwatch) this.stepsUnwatch();
  }
};
</script>

<style scoped>
.layout {
  background-color: #ff3859;
  padding: 30px 20px 50px 20px;
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

.error-message {
  color: #ffffff;
}

/* material edit */
.theme--light.v-icon {
  color: #ffffff !important;
}
</style>
