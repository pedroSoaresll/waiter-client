<template>
  <v-layout row wrap>
    <v-flex xs12 md6 v-for="item of categories[0].children" :key="item.id">
      <item :item="item"/>
    </v-flex>
  </v-layout>
</template>

<script>
/* mocks */
import categories from '../mocks/category';
import Item from './Item';

export default {
  name: 'ShowCategory',
  components: { Item },
  data: () => ({
    categories,
  }),
};
</script>

<style scoped>
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
</style>
