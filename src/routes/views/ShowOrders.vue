<template>
  <v-container fluid>
    <v-layout row wrap>
      <restaurant-name/>
    </v-layout>

    <v-layout row wrap class="mt-5 mb-5">
      <v-flex xs12>
        <h3>Pedido em aberto</h3>
      </v-flex>

      <v-flex xs12 class="mt-3" v-if="orderSeparated.length">
        <v-data-table rows-per-page-text="Itens por página" :headers="headers"
                      :items="orderSeparated"
                      no-data-text="Nenhum resultado para mostrar" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.quantity }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.price }}</td>
            <td class="text-xs-center">{{ props.item.price * props.item.quantity }}</td>
            <td class="text-xs-center">
              <v-btn flat icon :small="true" color="red" @click="removeSeparatedItem(props.item)">
                <v-icon class="font-size-md">close</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex xs12 class="mt-2">
        <v-btn v-if="orderSeparated.length" block round color="orange"
               class="white--text" @click="orderRequest">Fazer pedido</v-btn>
        <v-btn v-else block round color="lightgray"
               @click="$router.push({ name: 'Categories' })">Ir para o cardápio</v-btn>
      </v-flex>
    </v-layout>


    <v-layout row wrap class="mt-5">
      <v-flex xs12>
        <h3>Pedidos fechados</h3>
      </v-flex>

      <v-flex xs12 class="mt-3" v-if="orderRequested.length">
        <v-data-table rows-per-page-text="Itens por página" :headers="headersRequested"
                      :items="orderRequested"
                      no-data-text="Nenhum resultado para mostrar" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">
              <v-chip>
                {{ props.item.status || 'Na fila' }}
              </v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.quantity }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.price }}</td>
            <td class="text-xs-center">{{ props.item.price * props.item.quantity }}</td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex xs12 class="mt-2">
        <v-btn v-if="orderRequested.length" block round color="orange"
               class="white--text">Feche a minha conta</v-btn>
        <template v-else>
          <v-alert :value="true" type="info">
            <p>Quando você realizar seu pedido vamos mostrar o status dele aqui :)</p>
            <p>Vamos permitir que você feche a sua conta também.</p>
          </v-alert>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RestaurantName from '../../components/RestaurantName';

export default {
  name: 'ShowOrders',
  components: { RestaurantName },
  data: () => ({
    headers: [
      {
        text: 'Qtde',
        align: 'center',
        // sortable: false,
        value: 'quantity',
      }, {
        text: 'Nome',
        align: 'left',
        value: 'name',
      }, {
        text: 'Unitário',
        align: 'left',
        value: 'price',
      }, {
        text: 'Valor',
        align: 'left',
        value: 'total',
      },
      {
        text: 'Ações',
        align: 'left',
        value: 'actions',
      },
    ],
    headersRequested: [
      {
        text: 'Status',
        align: 'center',
        // sortable: false,
        value: 'status',
      }, {
        text: 'Qtde',
        align: 'center',
        // sortable: false,
        value: 'quantity',
      }, {
        text: 'Nome',
        align: 'left',
        value: 'name',
      }, {
        text: 'Unitário',
        align: 'left',
        value: 'price',
      }, {
        text: 'Valor',
        align: 'left',
        value: 'total',
      },
    ],
  }),
  computed: {
    orderSeparated() {
      return this.$store.getters['order/ordersSeparated'];
    },

    orderRequested() {
      return this.$store.getters['order/ordersRequested'];
    },
  },
  methods: {
    removeSeparatedItem(item) {
      this.$store.commit('order/removeSeparatedItem', item);
    },

    orderRequest() {
      this.$store.dispatch('order/requestOrdersSeparated');
    },
  },
};
</script>

<style scoped>

</style>
