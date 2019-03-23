<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      //
    };
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
