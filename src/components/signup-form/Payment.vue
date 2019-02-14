<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi" />
    </v-flex>

    <!-- steps here -->
    <v-form v-model="valid">
      <v-container row wrap grid-list-md xs12 class="wrapper">
        <v-layout row wrap>
          <v-flex column wrap xs12>
            <p class="text-obrigado mb-0">Pagamento do plano</p>
            <p class="text-faca-pagamento text-16px mt-3">
              Você está quase lá para pegar o seu Kovi. Selecione abaixo a forma
              de pagamento do seu caução e do seu aluguel.
            </p>
          </v-flex>

          <v-flex column wrap xs12 class="mt-4">
            <p class="subtitle font-weight-bold text-uppercase">
              PAGAMENTO CAUÇÃO
            </p>
            <v-radio-group
              v-model="form.caucao.PaymentMethod"
              required
              v-on:change="valid = true"
            >
              <v-radio label="Boleto Bancário" value="boleto" />
              <v-radio
                disabled
                label="Cartão de Crédito"
                value="cartao-credito"
              />
            </v-radio-group>

            <!-- area cartão de crédito -->
            <!--<v-flex column wrap xs12 v-if="form.caucao.PaymentMethod === 'cartao-credito'">
              <v-text-field
                v-model="form.caucao.cc_number"
                label="Número do Cartão"
                :required="form.caucao.PaymentMethod === 'cartao-credito'"
                :rules="rules.cc_numberRules"
                mask="#### #### #### ####"
                box
              ></v-text-field>
              <v-text-field
                v-model="form.caucao.cc_holder_name"
                label="Nome como do Cartão"
                :required="form.caucao.PaymentMethod === 'cartao-credito'"
                :rules="rules.cc_holder_nameRules"
                box
              ></v-text-field>
              <v-text-field
                v-model="form.caucao.cc_holder_cpf"
                label="CPF do Titular"
                :required="form.caucao.PaymentMethod === 'cartao-credito'"
                :rules="rules.cc_holder_cpfRules"
                mask="###.###.###-##"
                box
              ></v-text-field>

              <v-layout row wrap grid-list-xs>
                <v-flex column wrap xs8>
                  <v-text-field
                    v-model="form.caucao.cc_expired_at"
                    label="Vencimento"
                    :required="form.caucao.PaymentMethod === 'cartao-credito'"
                    :rules="rules.cc_expired_atRules"
                    mask="##/####"
                    box
                  ></v-text-field>
                </v-flex>

                <v-flex column wrap xs4>
                  <v-text-field
                    v-model="form.caucao.cc_cvv"
                    label="CVV"
                    :required="form.caucao.PaymentMethod === 'cartao-credito'"
                    :rules="rules.cc_cvvRules"
                    box
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>-->
          </v-flex>

          <v-flex column wrap class="mt-4">
            <p class="subtitle font-weight-bold text-uppercase">
              PAGAMENTO DA PRIMEIRA SEMANA 
            </p>
            <v-radio-group
              v-model="form.week.PaymentMethod"
              required
              v-on:change="valid = true"
            >
              <v-radio label="Boleto Bancário" value="boleto" />
              <v-radio
                disabled
                label="Cartão de Crédito"
                value="cartao-credito"
              />
            </v-radio-group>

            <!-- area cartão de crédito -->
            <!--<v-flex column wrap xs12 v-if="form.week.PaymentMethod === 'cartao-credito'">
              <v-text-field
                v-model="form.week.cc_number"
                label="Número do Cartão"
                :required="form.week.PaymentMethod === 'cartao-credito'"
                :rules="rules.cc_numberRules"
                mask="#### #### #### ####"
                box
              ></v-text-field>
              <v-text-field
                v-model="form.week.cc_holder_name"
                label="Nome como do Cartão"
                :required="form.week.PaymentMethod === 'cartao-credito'"
                :rules="rules.cc_holder_nameRules"
                box
              ></v-text-field>
              <v-text-field
                v-model="form.week.cc_holder_cpf"
                label="CPF do Titular"
                :required="form.week.PaymentMethod === 'cartao-credito'"
                :rules="rules.cc_holder_cpfRules"
                mask="###.###.###-##"
                box
              ></v-text-field>

              <v-layout row wrap grid-list-xs>
                <v-flex column wrap xs8>
                  <v-text-field
                    v-model="form.week.cc_expired_at"
                    label="Vencimento"
                    :required="form.week.PaymentMethod === 'cartao-credito'"
                    :rules="rules.cc_expired_atRules"
                    mask="##/####"
                    box
                  ></v-text-field>
                </v-flex>

                <v-flex column wrap xs4>
                  <v-text-field
                    v-model="form.week.cc_cvv"
                    label="CVV"
                    :required="form.week.PaymentMethod === 'cartao-credito'"
                    :rules="rules.cc_cvvRules"
                    box
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>-->
          </v-flex>
        </v-layout>

        <v-flex
          column
          wrap
          xs12
          align-self-center
          class="mt-5"
          v-if="info.length > 0"
        >
          <div v-for="(item, index) in info" :key="index">
            <p
              class="text-mensage-erro"
              :class="{
                'text-mensage-erro': item.type === 'error',
                'text-mensage-success': item.type === 'success'
              }"
            >
              - {{ item.message }}
            </p>
          </div>
        </v-flex>

        <!-- button avançar -->
        <v-layout column wrap xs12 class="mt-3">
          <v-flex column wrap xs12 align-self-center>
            <v-btn
              round
              :disabled="!valid"
              v-on:click="wrapperPayments"
              class="btn-pink"
              :large="true"
              >Avançar</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-layout>
</template>

<script>
import { theme } from "../../plugins/vuetify";
import { BOOKING_INFO, BOOKING_UPDATE } from "../../services/Booking";
import { PAYMENTMETHOD_CREATE } from "../../services/Payments";

export default {
  data: () => ({
    valid: false,
    info: [],
    newTheme: {
      ...theme,
      primary: "#ff3859"
    },
    modal: false,
    form: {
      garageOtherAddress: false,
      date: "",
      caucao: {
        PaymentMethod: "",
        cc_holder_name: "",
        cc_holder_cpf: "",
        cc_number: "",
        cc_expired_at: "",
        cc_cvv: ""
      },
      week: {
        PaymentMethod: "",
        cc_holder_name: "",
        cc_holder_cpf: "",
        cc_number: "",
        cc_expired_at: "",
        cc_cvv: ""
      }
    },
    rules: {
      cc_holder_nameRules: [v => !!v || "Nome do titular é obrigatorio!"],
      cc_expired_atRules: [v => !!v || "Data de vencimento é obrigatorio!"],
      cc_holder_cpfRules: [v => !!v || "CPF do titular é obrigatorio!"],
      cc_numberRules: [v => !!v || "Número do cartão é obrigatorio!"],
      cc_cvvRules: [v => !!v || "Número do CVV é obrigatorio!"]
    }
  }),
  mounted() {
    this.$vuetify.theme = this.newTheme;
  },
  beforeDestroy() {
    this.$vuetify.theme = theme;
  },
  computed: {
    driver() {
      return this.$store.getters["lead/driver"];
    }
  },
  apollo: {
    bookings: {
      query: BOOKING_INFO,
      variables() {
        return { id: this.driver.booking.id };
      }
    }
  },
  methods: {
    setCardToken(data) {
      const key = process.env.VEU_APP_ADYEN_CSE_KEY;
      const options = { enableValidations: false };
      // eslint-disable-next-line
      const cseInstance = adyen.createEncryption(key, options);
      const cardData = {
        number: data.cc_number,
        cvc: data.cc_cvc,
        holderName: data.cc_holder_name,
        expiryMonth: data.cc_expiry_month,
        expiryYear: data.cc_expiry_year,
        generationtime: this.$moment.utc().format("YYYY-MM-DDTHH:mm:ss.sssZ")
      };
      return cseInstance.encrypt(cardData);
    },
    async createCreditMethod(data) {
      try {
        const card_token = await this.setCardToken(data);
        console.log(card_token);
        console.log({
          driver: this.driver.id,
          holder_name: data.cc_holder_name,
          holder_cpf: data.cc_holder_cpf,
          token: card_token,
          status: "ACTIVE"
        });
        if (card_token === false) {
          this.info.push({ message: "Cartão Inválido!", type: "error" });
          throw new Error("Cartão inválido!");
        }

        console.log("dados ate aqui:: cartão de credito");
        return this.$apollo
          .mutate({
            mutation: PAYMENTMETHOD_CREATE,
            variables: {
              driver: this.driver.id,
              holder_name: data.cc_holder_name,
              holder_cpf: data.cc_holder_cpf,
              type: "credit_card",
              token: card_token,
              status: "ACTIVE"
            }
          })
          .then(result => {
            this.info.push({
              message: "Metodo de pagamento via cartão criado!",
              type: "success"
            });

            return result;
          })
          .catch(error => {
            this.info.push({
              message: "Não foi possível salvar este cartão!",
              type: "error"
            });
            throw error;
          });
      } catch (e) {
        this.info.push({ message: "Finalizado sem sucesso!", type: "error" });

        throw e;
      }
    },
    async createBoletoMethod() {
      try {
        return this.$apollo
          .mutate({
            mutation: PAYMENTMETHOD_CREATE,
            variables: {
              driver: this.driver.id,
              type: "boleto",
              status: "ACTIVE"
            }
          })
          .then(result => {
            this.info.push({
              message: "Metodo de pagamento via boleto criado!",
              type: "success"
            });

            return result;
          })
          .catch(error => {
            this.info.push({
              message: "Não foi possível salvar boleto como pagamento!",
              type: "error"
            });
          });
      } catch (e) {
        throw e;
      }
    },
    async updateBooking({ pre_transaction_method, transaction_method }) {
      try {
        return this.$apollo
          .mutate({
            mutation: BOOKING_UPDATE,
            variables: {
              id: this.driver.booking.id,
              driver: this.driver.id,
              plan: this.$route.params.plan.id,
              transaction_method: transaction_method,
              pre_transaction_method: pre_transaction_method
            }
          })
          .then(result => {
            console.warn(result);
            this.info.push({
              message: "Finalizado com sucesso!",
              type: "success"
            });
            setTimeout(
              () => this.$router.push({ name: "PaymentStatus" }),
              3000
            );
          })
          .catch(error => {
            this.info.push({
              message: "Não foi possível salvar pagamentos!",
              type: "error"
            });
          });
      } catch (e) {
        throw e;
      }
    },
    async wrapperPayments() {
      try {
        const method = { pre_transaction_method: "", transaction_method: "" };
        if (this.form.caucao.PaymentMethod === "cartao-credito") {
          const res = await this.createCreditMethod(this.form.caucao);
          method.pre_transaction_method = res.data.createPaymentMethod.id;
          method.pre_transaction_token = res.data.createPaymentMethod.token;
        }
        if (this.form.caucao.PaymentMethod === "boleto") {
          const res = await this.createBoletoMethod();
          method.pre_transaction_method = res.data.createPaymentMethod.id;
          method.pre_transaction_token = res.data.createPaymentMethod.token;
        }
        if (this.form.week.PaymentMethod === "cartao-credito") {
          const res = await this.createCreditMethod(this.form.week);
          method.transaction_method = res.data.createPaymentMethod.id;
          method.transaction_token = res.data.createPaymentMethod.token;
        }

        if (this.form.week.PaymentMethod === "boleto") {
          const res = await this.createBoletoMethod();
          method.transaction_method = res.data.createPaymentMethod.id;
          method.transaction_token = res.data.createPaymentMethod.token;
        }

        await this.updateBooking({ ...method });
      } catch (e) {
        this.info.push({ message: "Finzalido com falha!", type: "error" });
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

.text-mensage-erro {
  font-size: 16px;
  color: red;
}

.text-mensage-success {
  font-size: 16px;
  color: green;
}

.subtitle {
  opacity: 0.6;
  font-size: 18px;
  color: #4a4a4a;
}
</style>
