<template>
  <v-layout row wrap>
    <v-flex xs12 md6 v-if="!$apollo.queries.itemsFromCategory.loading" v-for="item of itemsFromCategory"
            :key="item.id">
      <item :item="item"/>
    </v-flex>
  </v-layout>
</template>

<script>
import GET_ITEMS from '../services/items.graphql';
import Item from './Item';

export default {
  name: 'ShowCategory',
  components: { Item },
  data: () => ({}),
  apollo: {
    itemsFromCategory: {
      query: GET_ITEMS,
      update({ items }) {
        console.log(items);
        return items;
      },
    },
  },
};
</script>

<style scoped>
    .bottom-gradient {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
    }
</style>
