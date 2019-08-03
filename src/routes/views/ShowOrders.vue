<template>
  <v-container fluid>
    <v-layout row wrap>
      <restaurant-name/>
    </v-layout>

    <v-tabs color="#9c27b0" dark grow class="mt-5">
      <v-tabs-slider color="#fafafa"></v-tabs-slider>
      <v-tab v-for="(tab, index) of tabs" :key="index" :href="'#tab-' + tab">
        {{ tab }}
      </v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-Pendentes">
          <orders-pending/>
        </v-tab-item>

        <v-tab-item value="tab-Andamento">
          <orders-closed/>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
import RestaurantName from '../../components/RestaurantName';
import OrdersPending from '../../components/OrdersPending';
import OrdersClosed from '../../components/OrdersClosed';

export default {
  name: 'ShowOrders',
  components: {
    OrdersClosed,
    OrdersPending,
    RestaurantName,
  },
  data: () => ({
    tab: null,
    tabs: [
      'Pendentes',
      'Andamento',
    ],
  }),
};
</script>
