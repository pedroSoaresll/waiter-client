<template>
  <v-layout column wrap xs12 class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap xs12 class="wrapper" v-if="transactions">
      <v-flex column wrap xs12>
        <p class="text-obrigado mb-0">Pagamento do plano</p>
        <p
          class="text-faca-pagamento text-16px mt-3"
        >Você está quase lá para pegar o seu Kovi. Selecione abaixo a forma de pagamento do seu caução e do seu aluguel.</p>
        <v-divider></v-divider>
      </v-flex>
      <v-flex
        v-for="(transaction, index) in transactions.items"
        :key="index"
        column
        wrap
        xs12
        class="mt-5"
      >
        <p
          class="subtitle font-weight-bold"
        >{{transaction.description}} ({{transaction.payment_method.type === 'boleto' ? 'Boleto bancário' : 'Cartão de Crédito' }})</p>
        <p
          class="text-success"
          v-if="transaction.status === 'PAID'"
        >Pagamento realizado com sucesso!</p>
        <p class="text-pink" v-if="transaction.status === 'PENDING'">Aguardando pagamento.</p>
        <v-flex
          column
          wrap
          xs12
          align-self-start
          class="mt-2"
          v-if="transaction.status === 'PENDING'"
        >
          <v-btn
            round
            class="btn-pink ml-0"
            :large="true"
            :href="transaction.barcode_url"
          >PAGAR BOLETO</v-btn>
        </v-flex>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { theme } from "../../plugins/vuetify";
import { TRANSACTION_DRIVER_INFO } from "../../services/Transactions";

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
  computed: {
    driver() {
      return this.$store.getters["lead/driver"];
    }
  },
  mounted() {
    this.$vuetify.theme = this.newTheme;
  },
  apollo: {
    transactions: {
      query: TRANSACTION_DRIVER_INFO,
      variables() {
        return { driver: this.driver.id };
      },
      update(res) {
        return res.transactions;
      },
      result(res) {
        if (!res.loading) {
          if (res.error !== undefined || res.data.transactions.items === null) {
            this.$store.commit("lead/setTransactions", []);
            this.errors = [];
            this.errors.push({ message: "Erro ao procurar suas Transações!" });
            return false;
          }

          this.$store.commit(
            "lead/setTransactions",
            res.data.transactions.items
          );
          return res.data.transactions;
        }
      }
    }
  },
  beforeDestroy() {
    this.$vuetify.theme = theme;
  },
  methods: {}
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
  font-size: 18px;
  opacity: 0.6;
}

.subtitle {
  opacity: 0.6;
  font-size: 18px;
  color: #4a4a4a;
}

.text-success,
.text-pink {
  font-size: 16px;
}

.text-success {
  color: #73bd53;
}

.text-pink {
  color: #ff3859;
}
</style>
