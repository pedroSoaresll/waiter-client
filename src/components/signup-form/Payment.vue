<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-form v-model="valid">
      <v-container row wrap grid-list-md xs12 class="wrapper">
      <v-layout row wrap>
        <v-flex column wrap xs12>
          <p class="text-obrigado mb-0">Pagamento do plano</p>
          <p
            class="text-faca-pagamento text-16px mt-3"
          >Você está quase lá para pegar o seu Kovi. Selecione abaixo a forma de pagamento do seu caução e do seu aluguel.</p>
        </v-flex>

        <v-flex column wrap xs12 class="mt-4">
          <p class="subtitle font-weight-bold text-uppercase">PAGAMENTO CAUÇÃO</p>
          <v-radio-group v-model="form.caucao.PaymentMethod" required v-on:change="valid = true">
            <v-radio label="Boleto Bancário" value="boleto"/>
            <v-radio label="Cartão de Crédito" value="cartao-credito"/>
          </v-radio-group>

          <!-- area cartão de crédito -->
          <v-flex column wrap xs12 v-if="form.caucao.PaymentMethod === 'cartao-credito'">
            <v-text-field
                    v-model="form.caucao.cc_number"
                    label="Número do Cartão"
                    :required="form.caucao.PaymentMethod === 'cartao-credito'"
                    :rules="rules.cc_numberRules"
                    mask="#### #### #### ####"
                    box></v-text-field>
            <v-text-field
                    v-model="form.caucao.cc_holder_name"
                    label="Nome como do Cartão"
                    :required="form.caucao.PaymentMethod === 'cartao-credito'"
                    :rules="rules.cc_holder_nameRules"
                    box></v-text-field>
            <v-text-field
                    v-model="form.caucao.cc_holder_cpf"
                    label="CPF do Titular"
                    :required="form.caucao.PaymentMethod === 'cartao-credito'"
                    :rules="rules.cc_holder_cpfRules"
                    mask="###.###.###-##"
                    box></v-text-field>

            <v-layout row wrap grid-list-xs>
              <v-flex column wrap xs8>
                <v-text-field
                        v-model="form.caucao.cc_expired_at"
                        label="Vencimento"
                        :required="form.caucao.PaymentMethod === 'cartao-credito'"
                        :rules="rules.cc_expired_atRules"
                        mask="##/####"
                        box></v-text-field>
              </v-flex>

              <v-flex column wrap xs4>
                <v-text-field
                        v-model="form.caucao.cc_cvv"
                        label="CVV"
                        :required="form.caucao.PaymentMethod === 'cartao-credito'"
                        :rules="rules.cc_cvvRules"
                        box></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>

        <v-flex column wrap class="mt-4">
          <p class="subtitle font-weight-bold text-uppercase">PAGAMENTO ALUGUEL</p>
          <v-radio-group v-model="form.week.PaymentMethod" required v-on:change="valid = true">
            <v-radio label="Boleto Bancário" value="boleto"/>
            <v-radio label="Cartão de Crédito" value="cartao-credito"/>
          </v-radio-group>

          <!-- area cartão de crédito -->
            <v-flex column wrap xs12 v-if="form.week.PaymentMethod === 'cartao-credito'">
                <v-text-field
                        v-model="form.week.cc_number"
                        label="Número do Cartão"
                        :required="form.week.PaymentMethod === 'cartao-credito'"
                        :rules="rules.cc_numberRules"
                        mask="#### #### #### ####"
                        box></v-text-field>
                <v-text-field
                        v-model="form.week.cc_holder_name"
                        label="Nome como do Cartão"
                        :required="form.week.PaymentMethod === 'cartao-credito'"
                        :rules="rules.cc_holder_nameRules"
                        box></v-text-field>
                <v-text-field
                        v-model="form.week.cc_holder_cpf"
                        label="CPF do Titular"
                        :required="form.week.PaymentMethod === 'cartao-credito'"
                        :rules="rules.cc_holder_cpfRules"
                        mask="###.###.###-##"
                        box></v-text-field>

                <v-layout row wrap grid-list-xs>
                    <v-flex column wrap xs8>
                        <v-text-field
                                v-model="form.week.cc_expired_at"
                                label="Vencimento"
                                :required="form.week.PaymentMethod === 'cartao-credito'"
                                :rules="rules.cc_expired_atRules"
                                mask="##/####"
                                box></v-text-field>
                    </v-flex>

                    <v-flex column wrap xs4>
                        <v-text-field
                                v-model="form.week.cc_cvv"
                                label="CVV"
                                :required="form.week.PaymentMethod === 'cartao-credito'"
                                :rules="rules.cc_cvvRules"
                                box></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-flex>
      </v-layout>

      <!-- button avançar -->
      <v-layout column wrap xs12 class="mt-3">
        <v-flex column wrap xs12 align-self-center>
          <v-btn round :disabled="!valid" v-on:click="wrapperPayments" class="btn-pink" :large="true">Avançar</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    </v-form>
  </v-layout>
</template>

<script>
import { theme } from "../../plugins/vuetify";
import { DRIVER_BOOKINGS } from "../../services/Booking";
import { PAYMENTMETHOD_CREATE } from "../../services/Payments";

export default {
  data: () => ({
    valid: false,
    newTheme: {
      ...theme,
      primary: "#ff3859"
    },
    modal: false,
    form: {
      garageOtherAddress: false,
      date: "",
      caucao: {
          PaymentMethod: '',
          cc_holder_name: '',
          cc_holder_cpf: '',
          cc_number: '',
          cc_expired_at: '',
          cc_cvv: '',
      },
      week: {
          PaymentMethod: ""
      }
    },
    rules: {
        cc_holder_nameRules: [
            v => !!v || 'Nome do titular é obrigatorio!',
        ],
        cc_expired_atRules: [
            v => !!v || 'Data de vencimento é obrigatorio!',
        ],
        cc_holder_cpfRules: [
            v => !!v || 'CPF do titular é obrigatorio!',
        ],
        cc_numberRules: [
            v => !!v || 'Número do cartão é obrigatorio!',
        ],
        cc_cvvRules: [
            v => !!v || 'Número do CVV é obrigatorio!',
        ],
    }
  }),
  mounted() {
    this.$vuetify.theme = this.newTheme;
  },
  beforeDestroy() {
    this.$vuetify.theme = theme;
  },
  apollo: {
      bookings: {
          query: DRIVER_BOOKINGS,
          variables() {
              return { id: this.$route.query.booking }
          },
      },
  },
  methods: {
      setCardToken(data) {
          const key = process.env.VEU_APP_ADYEN_CSE_KEY;
          const options = {enableValidations: false};
          // eslint-disable-next-line
          const cseInstance = adyen.createEncryption(key, options);
          const cardData = {
              number: data.cc_number,
              cvc: data.cc_cvc,
              holderName: data.cc_holder_name,
              expiryMonth: data.cc_expiry_month,
              expiryYear: data.cc_expiry_year,
              generationtime: this.$moment.utc().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
          };
          return cseInstance.encrypt(cardData);
      },
      async createCreditMethod(data) {
          try {
              const card_token = await this.setCardToken(data);
              console.log(card_token);
              console.log({
                  driver: this.$route.query.id,
                  holder_name: data.cc_holder_name,
                  holder_cpf: data.cc_holder_cpf,
                  token: card_token,
                  status: 'ACTIVE',
              });
              if (card_token === false) throw new Error('Cartão inválido!');

              return this.$apollo
                  .mutate({
                      mutation: PAYMENTMETHOD_CREATE,
                      variables: {
                          driver: this.$route.query.id,
                          holder_name: data.cc_holder_name,
                          holder_cpf: data.cc_holder_cpf,
                          type: 'credit_card',
                          token: card_token,
                          status: 'ACTIVE',
                      },
                  })
                  .then(result => result)
                  .catch(error => {
                      console.log(error)
                      throw new Error('Não foi possível salvar este cartão');
                  });
          } catch (e) {
              throw e;
          }
      },
      async createBoletoMethod() {
          try {
              return this.$apollo
                      .mutate({
                          mutation: PAYMENTMETHOD_CREATE,
                          variables: {
                              driver: this.$route.query.id,
                              type: 'boleto',
                              status: 'ACTIVE',
                          },
                      })
                      .then(result => result)
                      .catch(error => {
                          console.log(error)
                          throw new Error('Não foi possível salvar este cartão');
                      })
          } catch (e) {
              throw e;
          }
      },
      async updateBooking({pre_transaction_method, transaction_method}) {
          try {
              return this.$apollo
                  .mutate({
                      mutation: BOOKING_UPDATE,
                      variables: {
                          driver: this.$route.query.id,
                          plan: this.$route.query.plan,
                          started_at: this.$route.query.started_at,
                          transaction_method: transaction_method,
                          pre_transaction_method: pre_transaction_method,
                      },
                  })
                  .then(result => result)
                  .catch(error => {
                      console.log(error);
                      throw new Error('Não foi possível salvar pagamentos');
                  })
          } catch (e) {
              throw e;
          }
          },
      async wrapperPayments() {
          if (this.$route.query.id === undefined || this.$route.query.booking === undefined) {
              console.error("Driver & Booking not set");
          }
          try {
              const method = { pre_transaction_method: '', transaction_method: '' };
              if (this.form.caucao.PaymentMethod === 'cartao-credito') {
                  const res = await this.createCreditMethod(this.form.caucao);
                  method.pre_transaction_method = res.data.createPaymentMethod.id;
                  method.pre_transaction_token = res.data.createPaymentMethod.token;
              }
              if (this.form.caucao.PaymentMethod === 'boleto') {
                  const res = await this.createBoletoMethod();
                  method.pre_transaction_method = res.data.createPaymentMethod.id;
                  method.pre_transaction_token = res.data.createPaymentMethod.token;
              }
              if (this.form.week.PaymentMethod === 'cartao-credito') {
                  const res = await this.createCreditMethod(this.form.week);
                  method.transaction_method = res.data.createPaymentMethod.id;
                  method.transaction_token = res.data.createPaymentMethod.token;
              }

              if (this.form.week.PaymentMethod === 'boleto') {
                  const res = await this.createBoletoMethod();
                  method.transaction_method = res.data.createPaymentMethod.id;
                  method.transaction_token = res.data.createPaymentMethod.token;
              }

              await this.updateBooking({...method});
          } catch (e) {
              console.error("wrapperPayments:",e)
          }

      }
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
  line-height: 39px;
}

.text-faca-pagamento {
  font-size: 16px;
  opacity: 0.6;
}

.subtitle {
  opacity: 0.6;
  font-size: 18px;
  color: #4a4a4a;
}
</style>
