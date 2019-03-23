<template>
  <v-layout row wrap>
    <v-flex xs6 v-for="category of categories" :key="category.id">
      <v-layout column justify-center>
        <v-btn round @click="openCategory(category)">{{ category.name }}</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
/* mocks */
import categories from '../mocks/category';

export default {
  name: 'ShowCategories',
  data: () => ({
    categories,
  }),
  methods: {
    openCategory({ id }) {
      this.$router.push({ name: 'Category', params: { categoryId: id } });
    },
  },
};
</script>

<style scoped>

</style>
