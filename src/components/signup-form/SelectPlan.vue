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
        <v-radio-group v-model="form.planSelect">
          <div v-for="plan in plans.items">
            <v-radio :label="plan.name" :value="plan.id"/>
            <v-flex align-self-start class="area-info-radio ml-4">
            <span
                    class="subtitle"
            >{{plan.description}}</span>
              <span class="subtitle">Valor R$ {{plan.transaction_amount/100}} / semana</span>
            </v-flex>
          </div>
        </v-radio-group>
      </v-flex>

      <v-flex column wrap xs12 class="mt-5">
        <p class="subtitle font-weight-bold text-uppercase mb-0">DATA DE RETIRADA DO CARRO</p>
        <p class="subtitle">Selecione a data que você gostaria de retirar o carro</p>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="form.car_delivery_scheduled"
            label="Selecione a data"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="form.car_delivery_scheduled" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(form.date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-5" v-if="errors.length > 0">
        <p class="text-mensage-erro" v-for="error in errors">- {{error.message}}</p>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-3">
        <v-btn class="btn-radius btn-pink"
               :disabled="form.planSelect === null || form.car_delivery_scheduled === null"
               @click="createBooking"
               large
        >Avançar</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { theme } from "../../plugins/vuetify";
import { LIST_PLANS } from "../../services/Plans";
import { BOOKING_OPEN } from "../../services/Booking";

export default {
    data: () => ({
        newTheme: {
            ...theme,
            primary: "#ff3859"
        },
        errors: [],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        form: {
            planSelect: null,
            car_delivery_scheduled: null,
        }
    }),
    apollo: {
        plans: {
            query: LIST_PLANS,
            variables() {
                return {status: 'ACTIVE', limit: 10, page: 0}
            },
        },
    },
    methods: {
        async createBooking() {
            try {
                return this.$apollo
                    .mutate({
                        mutation: BOOKING_OPEN,
                        variables: {
                            driver: this.$store.getters["lead/driver"].id,
                            plan: this.form.planSelect,
                            started_at: new Date().toJSON().slice(0, 19).replace('T', ' '),
                            car_delivery_scheduled: this.form.car_delivery_scheduled
                        },
                    })
                    .then(result => {
                        this.$store.commit('lead/setPlan', result.openBooking);
                        this.$router.push({name: 'FinishForm'});
                    })
                    .catch(error => {
                        this.errors.push({message: error.message.replace('GraphQL error: ', '')})
                    })
            } catch (e) {
                throw e;
            }
        },

    },
    mounted() {
        this.$vuetify.theme = this.newTheme;
        const driver = this.$store.getters["lead/driver"];
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

.text-mensage-erro {
  font-size: 16px;
  color: red;
}

.subtitle {
  opacity: 0.6;
  font-size: 16px;
  color: #4a4a4a;
}
</style>
