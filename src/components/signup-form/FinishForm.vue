<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi"/>
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-obrigado mb-0">Obrigado <i class="far fa-grin-wink kovi-color"></i></p>
        <p class="text-para-acelerar text-16px mt-5">
          As suas informações estão sendo analisadas pela nossa equipe.
        </p>
        <p class="text-para-acelerar text-16px mt-2">
          <strong> Fique atento ao seu email e telefone</strong>,
          enviaremos os próximos passos por lá ;)
        </p>

        <p class="text-para-acelerar text-16px mt-2">
          Grande abraço,<br/>
          Equipe Kovi
        </p>
      </v-flex>

      <v-flex column wrap xs12>
        <img class="gif-image" :src="require('../../assets/giphy.gif')"
             alt="GIF de homem digitando no computador"/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  import {theme} from "../../plugins/vuetify";

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
  }

  .text-para-acelerar {
    opacity: 0.6;
  }

  .subtitle {
    opacity: 0.6;
    font-size: 18px;
    color: #4a4a4a;
  }

  .gif-image {
    max-width: 100%
  }

</style>
