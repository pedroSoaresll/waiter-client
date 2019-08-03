<template>
  <v-card>
    <v-img v-if="item.image" :src="item.image" :alt="item.name">
      <div class="fill-height bottom-gradient"></div>
    </v-img>
    <v-card-title primary-title>
      <v-layout row wrap>
        <v-flex xs6>
          <p class="font-size-md">{{ item.name }}</p>
        </v-flex>
        <v-flex xs6>
          <p class="text-right text-success font-weight-bold font-size-md">
            {{ item.amount | price_formatted }} </p>
        </v-flex>

        <v-flex xs12>
          <p>{{ item.description }}</p>
        </v-flex>
      </v-layout>
    </v-card-title>

    <v-card-actions class="d-block">
      <v-layout row wrap justify-end align-center>
        <v-btn flat color="orange" icon @click="removeItem">
          <v-icon>remove</v-icon>
        </v-btn>

        <span class="font-weight-bold font-size-md ml-1 mr-1">{{ quantity }}</span>

        <v-btn flat color="orange" icon @click="addItem">
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>

      <v-layout row wrap v-if="quantity">
        <v-flex xs12>
          <v-btn class="w-100 text-white" color="green" @click="orderThat">
            Colocar este item em pedidos
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>

    <v-snackbar v-model="snackbar" vertical bottom :timeout="3500">
      Item foi adicionado a sua lista de pedidos
      <v-layout row wrap justify-end>
        <v-btn flat @click="$router.push({ name: 'Orders' })">Quero ver meus pedidos</v-btn>
        <v-btn flat class="ml-3" @click="snackbar = false">Fechar</v-btn>
      </v-layout>
    </v-snackbar>
  </v-card>

</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    quantity: 0,
    snackbar: false,
  }),
  methods: {
    addItem() {
      ++this.quantity;
    },

    removeItem() {
      if (this.quantity) --this.quantity;
    },

    orderThat() {
      const item = Object.assign({
        quantity: this.quantity,
      }, this.item);

      this.quantity = 0;
      this.$store.commit('order/separateItem', item);
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>

</style>
