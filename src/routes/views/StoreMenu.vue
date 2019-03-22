<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <restaurant-name/>

      <v-flex xs12 mt-4>
        <p>
          Olá {{ clientname }}, fique a vontade para fazer seu pedido.
          Qualquer coisa você também pode
          <a @click.prevent="getHelp" class="links font-weight-bold">
            pedir ajuda
          </a> 🙂
        </p>
      </v-flex>

      <v-flex xs12>
        <h3 class="font-size-lg font-weight-bold orange--text mt-4">Cardápio</h3>
      </v-flex>

      <v-layout row wrap>
        <v-flex xs6 align-self-center>
          <v-card class="elevation-1">
            <v-card-title class="d-block text-center">
              <span class="font-weight-bold font-size-md">Bebidas</span>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs6 align-self-center>
          <v-card class="elevation-1">
            <v-card-title class="d-block text-center">
              <span class="font-weight-bold font-size-md">Pratos</span>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs6 align-self-center>
          <v-card class="elevation-1">
            <v-card-title class="d-block text-center">
              <span class="font-weight-bold font-size-md">Pratos</span>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs6 align-self-center>
          <v-card class="elevation-1">
            <v-card-title class="d-block text-center">
              <span class="font-weight-bold font-size-md">Pratos</span>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs6 align-self-center>
          <v-card class="elevation-1">
            <v-card-title class="d-block text-center">
              <span class="font-weight-bold font-size-md">Pratos</span>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs6 align-self-center>
          <v-card class="elevation-1">
            <v-card-title class="d-block text-center">
              <span class="font-weight-bold font-size-md">Pratos</span>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs6 align-self-center>
          <v-card class="elevation-1">
            <v-card-title class="d-block text-center">
              <span class="font-weight-bold font-size-md">Pratos</span>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs6 align-self-center>
          <v-card class="elevation-1">
            <v-card-title class="d-block text-center">
              <span class="font-weight-bold font-size-md">Pratos</span>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import RestaurantName from '../../components/RestaurantName.vue';

export default {
  name: 'StoreMenu',
  components: { RestaurantName },
  methods: {
    getHelp() {
      //
    },
  },
};
</script>

<style scoped>

</style>
