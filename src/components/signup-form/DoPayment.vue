<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-obrigado mb-0">O seu carro está te esperando!</p>
        <p class="text-faca-pagamento text-16px mt-3">
            Faça o pagamento do seu caucao e aluguel para o seu Kovi.
        </p>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-5" v-if="errors.length > 0">
        <p class="text-mensage-erro" v-for="(error, index) in errors" :key="index">{{error.message}}</p>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-5">
        <v-btn round class="btn-pink" @click="goPayment" :large="true">PAGAR MINHA LOCAÇÃO</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { theme } from "../../plugins/vuetify";
import { BOOKING_INFO } from "../../services/Booking";


export default {
    data: () => ({
        newTheme: {
            ...theme,
            primary: "#ff3859"
        },
        autoGoPay: false,
        errors: [],
        skipQuery: true,
        modal: false,
        form: {
            garageOtherAddress: false,
            date: ""
        },
    }),
    mounted() {
        this.$vuetify.theme = this.newTheme;
    },
    apollo: {
        booking: {
            query: BOOKING_INFO,
            variables() {
                return {id: this.$route.query.booking}
            },
            update(res) {
                return res.booking
            },
            result(res) {
                console.log(res)
                if (!res.loading) {
                    if (res.error !== undefined || res.data.booking.id === undefined) {
                        this.$store.commit('lead/setBooking', {});
                        this.errors = [];
                        this.errors.push({message: 'Reserva não encontrada!'});
                        return false;
                    }

                    if (res.data.booking.status === 'ACTIVE') {
                        this.$router.push({name: 'BookingDate', params: {...res.data.booking}});
                        return;
                    }

                    this.$store.commit('lead/setBooking', res.data.booking);
                    this.$store.commit('lead/setDriver', res.data.booking.driver);
                    this.$store.commit('lead/setPlan', res.data.booking.plan);
                    if (this.autoGoPay) {
                        this.$router.push({name: 'Payment', params: {...res.data.booking}});
                    }
                }
            }
        },
    },
    methods: {
        goPayment() {
            if (this.$route.query.booking === null || this.$route.query.booking === undefined) {
                this.errors = [];
                this.errors.push({message: 'Reserva inválida!'});
                return false;
            }
            this.autoGoPay = true;
            this.$apollo.queries.booking.skip = false;
            this.$apollo.queries.booking.refetch({
                id: this.$route.query.booking,
            });

            return true;

        }
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
	color: #4A4A4A;
  line-height: 39px;
}

.text-faca-pagamento {
  font-size: 18px;
  opacity: 0.6;
}

.text-mensage-erro {
  font-size: 16px;
  color: red;
}

.subtitle {
  opacity: 0.6;
  font-size: 18px;
  color: #4a4a4a;
}
</style>
