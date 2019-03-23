<template>
  <v-card>
    <v-img :src="require('../assets/images/macarrao.jpg')" :alt="item.name">
      <div class="fill-height bottom-gradient"></div>
    </v-img>
    <v-card-title primary-title>
      <v-layout row wrap>
        <v-flex xs6>
          <p class="font-size-md">{{ item.name }}</p>
        </v-flex>
        <v-flex xs6>
          <p class="text-right text-success font-weight-bold font-size-md">
            {{ item.price | price_formatted }}
          </p>
        </v-flex>

        <v-flex xs12>
          <p>{{ item.description }}</p>
        </v-flex>
      </v-layout>
    </v-card-title>

    <v-card-actions>
      <v-layout row wrap justify-end align-center>
        <v-btn flat color="orange" icon>
          <v-icon>remove</v-icon>
        </v-btn>

        <span class="font-weight-bold font-size-md">0</span>

        <v-btn flat color="orange" icon>
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>
    </v-card-actions>
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
};
</script>

<style scoped>

</style>
