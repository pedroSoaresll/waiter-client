<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <restaurant-name/>

      <v-flex xs12 mt-4>
        <p>
          Olá {{ clientName }}, fique a vontade para fazer seu pedido.
          Qualquer coisa você também pode
          <a @click.prevent="getHelp" class="links font-weight-bold">
            pedir ajuda
          </a> 🙂 </p>
      </v-flex>

      <v-flex xs12>
        <breadcrumb/>
      </v-flex>

      <router-view/>
    </v-layout>
  </v-container>
</template>

<script>
import RestaurantName from '../../components/RestaurantName.vue';
import Breadcrumb from '../../components/breadcrumb';

export default {
  name: 'StoreMenu',
  components: { Breadcrumb, RestaurantName },
  data: () => ({
    categorySelected: null,
  }),
  computed: {
    clientName() {
      const clientName = this.$store.getters['client/name'];
      return clientName ? clientName.split(' ')[0] : clientName;
    },
  },
  methods: {
    getHelp() {
      //
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
