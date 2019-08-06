<template>
  <v-layout row wrap align-center justify-space-between>
    <v-flex xs10 md11>
      <h1 class="font-size-lg purple--text">Restaurante X</h1>
    </v-flex>

    <v-flex xs2 md1>
      <v-btn flat icon @click="logout">
        <v-icon>close</v-icon>
      </v-btn>
    </v-flex>

    <v-flex xs12>
      <h3 class="font-size-md">Seja bem vindo(a)</h3>
    </v-flex>

    <v-dialog v-model="openDialog" class="dialog-close" width="400">
      <v-card>
        <v-card-title class="headline">Hey, espera um pouquinho</v-card-title>
        <v-card-text>
          Parece que você ainda tem pedidos pendentes ou prontos para ser entregues a você.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="goToOrders"
            color="warning">Quero conferir meus pedidos</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'RestaurantName',
  data: () => ({
    openDialog: false,
  }),
  methods: {
    logout() {
      try {
        this.$store.dispatch('client/logoutSession');
      } catch (e) {
        this.openDialog = true;
      }
    },

    goToOrders() {
      this.openDialog = !this.openDialog;
      this.$router.push({ name: 'Orders' });
    },
  },
};
</script>
