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
import GET_CATEGORIES from '../services/categories.graphql';

export default {
  name: 'ShowCategories',
  data: () => ({
    currentCategory: {
      name: '',
      routerName: '',
      params: {},
    },
  }),
  apollo: {
    categories: {
      query: GET_CATEGORIES,
      update({ categories }) {
        const response = categories;
        response.children = [];
        return response;
      },
    },
  },
  methods: {
    openCategory({ id, name }) {
      const params = { categoryId: id };
      this.currentCategory = {
        name,
        routerName: 'Category',
        params,
      };

      this.$store.commit('breadcrumb/addItem', this.currentCategory);
      this.$router.push({ name: 'Category', params });
    },
  },
  created() {
    this.$store.commit('breadcrumb/setItems', [{
      name: 'Cardápio',
      routerName: 'Categories',
      params: {},
    }]);
  },
};
</script>

<style scoped>

</style>
