<template>
  <v-layout row wrap class="mt-5 mb-5">
    <v-flex xs12>
      <h3>Pedido em aberto</h3>
      <p class="mt-2">Aqui você verá os itens que você selecionou para pedir do cardápio.</p>
    </v-flex>

    <v-flex xs12 class="mt-3" v-if="orderSeparated.length">
      <v-data-table item-key="orders-pending" rows-per-page-text="Itens por página" :headers="headers" :items="orderSeparated"
                    no-data-text="Nenhum resultado para mostrar" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.quantity }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.amount | price_formatted }}</td>
          <td class="text-xs-left">{{ props.item.amount * props.item.quantity | price_formatted }}</td>
          <td class="text-xs-left">
            <v-btn flat icon :small="true" color="red" @click="removeSeparatedItem(props.item)">
              <v-icon class="font-size-md">close</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12 class="mt-2">
      <v-btn v-if="orderSeparated.length" block round color="orange" class="white--text" @click="orderRequest">Fazer
        pedido
      </v-btn>
      <v-btn v-else block round color="lightgray" @click="$router.push({ name: 'Categories' })">Ir para o cardápio
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'OrdersPending',
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
        value: 'amount',
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
  }),
  computed: {
    orderSeparated() {
      return this.$store.getters['order/ordersSeparated'];
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
