<template>
  <v-app>
    <router-view class="mb-5"/>
    <v-divider class="mb-5"/>
    <v-bottom-nav :active.sync="bottomNavActive" :value="showNav" fixed shift color="#FFF">
      <v-btn color="primary" flat value="person">
        <span>Eu</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn color="primary" flat value="categories" :disabled="!clientName">
        <span>Cardápio</span>
        <v-icon>dashboard</v-icon>
      </v-btn>

      <v-btn color="primary" flat value="orders" :disabled="!clientName">
        <span>Pedido</span>
        <v-icon>restaurant</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
    };
  },
  computed: {
    showNav() {
      return this.$route.name !== 'Home';
    },
    clientName() {
      return this.$store.getters['client/name'];
    },
    bottomNavActive: {
      get() {
        return this.$store.getters['bottomNav/current'];
      },
      set(value) {
        if (!value) return;
        switch (value) {
          case 'person':
            this.$router.push({ name: 'GetBasicInfo' });
            break;
          case 'categories':
            this.$router.push({ name: 'Categories' });
            break;
          case 'orders':
            this.$router.push({ name: 'Orders' });
            break;
          default:
            this.$router.push({ name: 'Home' });
          // todo - implement a empty state to indicate that page is not exists
        }
      },
    },
  },
};
</script>

<style lang="sass">
  @import './assets/scss/font-sizes.scss'

  *
    font-family: 'Overpass', sans-serif

  body
    font-size: 100%
</style>
