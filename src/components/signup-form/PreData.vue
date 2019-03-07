<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-form ref="form" v-model="isValid">
      <v-layout column wrap xs12 class="wrapper">
        <v-flex column wrap xs12>
          <p class="text-qual-empresa mb-0"> Em quais aplicativos de mobilidade você trabalha hoje?</p>
          <!-- <p
            class="text-para-acelerar text-16px mt-2"
          >Para acelerar o seu aluguel, precisamos saber para qual empresa de mobilidade você trabalha.</p> -->
        </v-flex>

        <v-flex column wrap xs12>
          <v-checkbox v-model="input.survey_app_uber" class="area-checkbox" label="Uber"/>
          <v-checkbox v-model="input.survey_app_99" class="area-checkbox" label="99"/>
          <v-checkbox v-model="input.survey_app_cabify" class="area-checkbox" label="Cabify"/>
          <v-checkbox
            v-model="input.survey_app_lady_driver"
            class="area-checkbox"
            label="Lady Driver"
          />
          <v-checkbox v-model="input.survey_app_others" class="area-checkbox" label="Outros"/>
        </v-flex>

        <v-flex column wrap xs12 class="mt-5">
          <p>Você possui garagem para alugar o carro?</p>
          <p class="text-para-acelerar text-16px mt-2">Pode ser prórpia ou alugada.</p>
          <v-checkbox
            required
            v-model="input.survey_has_garage"
            class="text-18px"
            label="Sim, possuo garagem na minha casa ou alugada."
          />
        </v-flex>

        <v-flex column wrap xs12>
          <p>Você possui menos de 13 pontos na sua CNH?</p>
          <v-checkbox
            required
            v-model="input.survey_low_points"
            class="text-18px"
            label="Sim, possuo menos de 13 pontos na minha CNH."
          />
        </v-flex>

        <v-flex column wrap xs12>
          <p>Você possui mais de 21 anos?</p>
          <v-checkbox
            required
            v-model="input.survey_be_over_21"
            class="text-18px"
            label="Sim, possuo mais de 21 anos."
          />
        </v-flex>

        <v-flex xs12 row wrap align-center class="mt-5">
          <p
            class="error-message"
            v-show="errorMessage"
          >Não foi possível atualizar suas informações. Por favor, tente novamente mais tarde.</p>
          <p
            class="error-message"
            v-show="surveyAppsError"
          >É obrigatório informar pelo menos um ou mais aplicativos que você trabalha.</p>
        </v-flex>
        <v-flex row wrap xs12 align-self-center class="mt-3">
          <v-btn
            :disabled="sent"
            class="btn-radius btn-pink"
            :large="true"
            @click="updateDriver"
          >Avançar</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    isValid: false,
    sent: false,
    errorMessage: false,
    surveyAppsError: false,
    stepsUnwatch: null,
    dataRule: [v => !!v || "Este campo é obrigatório!"],
    input: {
      survey_be_over_21: false,
      survey_has_garage: false,
      survey_low_points: false,
      survey_app_99: false,
      survey_app_uber: false,
      survey_app_cabify: false,
      survey_app_lady_driver: false,
      survey_app_others: false
    }
  }),
  methods: {
    updateDriver() {
      this.errorMessage = false;
      this.surveyAppsError = false;

      const surveyAppsValidate = [
        this.input.survey_app_99,
        this.input.survey_app_uber,
        this.input.survey_app_cabify,
        this.input.survey_app_lady_driver,
        this.input.survey_app_others
      ].filter(value => !!value);

      if (!surveyAppsValidate.length) this.surveyAppsError = true;

      this.$refs.form.validate();

      if (this.isValid && surveyAppsValidate.length) {
        this.sent = true;
        this.$store.dispatch("lead/sendSurveyDriver", this.input);
      }
    }
  },
  mounted() {
    const driver = this.$store.getters["lead/driver"];
    this.input.survey_be_over_21 = Boolean(driver.survey_be_over_21);
    this.input.survey_has_garage = Boolean(driver.survey_has_garage);
    this.input.survey_low_points = Boolean(driver.survey_low_points);
    this.input.survey_app_99 = Boolean(driver.survey_app_99);
    this.input.survey_app_uber = Boolean(driver.survey_app_uber);
    this.input.survey_app_cabify = Boolean(driver.survey_app_cabify);
    this.input.survey_app_lady_driver = Boolean(driver.survey_app_lady_driver);
    this.input.survey_app_others = Boolean(driver.survey_app_others);

    // watch steps data
    this.stepsUnwatch = this.$store.watch(
      state => {
        return state.lead.steps;
      },
      value => {
        const { complete, invalid } = value.SEND_SURVEY_DRIVER;
        if (invalid) {
          // show error to user
          this.sent = false;
          this.errorMessage = true;
        } else if (complete) {
          this.$router.push({ name: "ConnectAccounts" });
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

.error-message {
  color: #ff3859;
  font-size: 16px;
}

.text-para-acelerar {
  opacity: 0.6;
}
</style>
