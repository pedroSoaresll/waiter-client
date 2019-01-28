<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-qual-empresa mb-0">Planos disponíveis</p>
        <p
          class="text-para-acelerar text-16px mt-2"
        >Selecione agora o plano que mais se adequa a sua realidade.</p>
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase">PLANOS DISPONÍVEIS</p>
        <v-radio-group>
          <v-radio label="Pescocinho 5k" value="pescocinho-5"/>
          <v-flex align-self-start class="area-info-radio ml-4">
            <span
              class="subtitle"
            >Com este plano você pode rodar 1.721Km / semana, ou 5.000 Km por mês</span>
            <span class="subtitle">Valor R$ 369,00 / semana</span>
          </v-flex>

          <v-radio class="mt-4" label="Pescocinho 10k" value="pescocinho-10"/>
          <v-flex align-self-start class="area-info-radio ml-4">
            <span
              class="subtitle"
            >Com este plano você pode rodar 1.721Km / semana, ou 9.000 Km por mês</span>
            <span class="subtitle">Valor R$ 469,00 / semana</span>
          </v-flex>
        </v-radio-group>
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase mb-0">DATA DE RETIRADA DO CARRO</p>
        <p class="subtitle">Selecione a data que você gostaria de retirar o carro</p>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="form.date"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="form.date"
            label="Selecione a data"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="form.date" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(form.date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-3">
        <v-btn class="btn-radius btn-pink" :large="true">Avançar</v-btn>
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
      date: ''
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

.text-para-acelerar {
  opacity: 0.6;
}

.subtitle {
  opacity: 0.6;
  font-size: 16px;
  color: #4a4a4a;
}

.area-info-radio {
}
</style>
