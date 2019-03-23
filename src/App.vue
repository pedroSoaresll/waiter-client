<template>
  <v-app>
    <router-view class="mb-5"/>
    <v-divider class="mb-5" />
    <v-bottom-nav :active.sync="bottomNavActive"
                  :value="showNav"
                  fixed
                  shift
                  color="#FFF">
      <v-btn color="primary" flat value="person">
        <span>Eu</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn color="primary" flat value="categories">
        <span>Cardápio</span>
        <v-icon>dashboard</v-icon>
      </v-btn>

      <v-btn color="primary" flat value="orders">
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
      showNav: true,
    };
  },
  computed: {
    bottomNavActive: {
      get() {
        return this.$route.meta.bottomNav;
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
            // todo - implementar limpeza de sessão para não deixar vestigios e causar possiveis problemas
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
