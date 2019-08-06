<template>
  <v-layout row wrap class="mt-5">
    <v-flex xs12>
      <h3>Pedidos fechados</h3>
      <p class="mt-2">Aqui você verá como está o andamento dos itens que você pediu.</p>
      <p>{{order}}</p>
    </v-flex>

    <v-flex xs12 class="mt-3" v-if="!$apollo.queries.order.loading">
      <v-data-table item-key="orders-closed" rows-per-page-text="Itens por página" :headers="headersRequested"
                    :items="order.orderItems" no-data-text="Nenhum resultado para mostrar" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">
            <v-chip>
              {{ props.item.status || 'Na fila' }}
            </v-chip>
          </td>
          <td class="text-xs-center">{{ props.item.quantity }}</td>
          <td class="text-xs-left">{{ props.item.item.name }}</td>
          <td class="text-xs-left">{{ props.item.item.amount | price_formatted }}</td>
          <td class="text-xs-left">{{ props.item.item.amount * props.item.quantity | price_formatted }}</td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12 class="mt-2">
      <v-btn v-if="!$apollo.queries.order.loading && order.orderItems.length" block round color="orange" class="white--text">Feche a minha conta</v-btn>
      <template v-else>
        <v-alert :value="true" type="info">
          <p>Quando você realizar seu pedido vamos mostrar o status dele aqui :)</p>
          <p>Vamos permitir que você feche a sua conta também.</p>
        </v-alert>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import GET_ORDERITEMS from '../services/get-orderitems.graphql';

export default {
  name: 'OrdersClosed',
  data: () => ({
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
        value: 'amount',
      }, {
        text: 'Valor',
        align: 'left',
        value: 'total',
      },
    ],
  }),
  apollo: {
    order: {
      query: GET_ORDERITEMS,
      update({ order }) {
        const iOrder = order;
        const { orderItems } = iOrder;
        const flatOrderItems = new Map();

        orderItems.forEach((orderItem) => {
          const iOrderItem = orderItem;

          if (flatOrderItems.has(iOrderItem.item.id)) {
            const mapItem = flatOrderItems.get(iOrderItem.item.id);
            mapItem.quantity += 1;
            return;
          }

          iOrderItem.quantity = 1;
          flatOrderItems.set(iOrderItem.item.id, iOrderItem);
        });

        iOrder.orderItems = [];
        for (const iFlatOrderItems of flatOrderItems.values()) {
          iOrder.orderItems.push(iFlatOrderItems);
        }

        return iOrder;
      },
    },
  },
  computed: {
    orderRequested() {
      return this.$store.getters['order/ordersRequested'];
    },
  },
};
</script>

<style scoped>

</style>
