<template>
  <v-app>
    <router-view></router-view>
    <!-- <v-content>
      <InterestedDriver/>
    </v-content> -->
  </v-app>
</template>

<script>
// import InterestedDriver from './components/InterestedDriver'
import { components } from 'aws-amplify-vue'

export default {
  name: 'App',
  components: {
      // InterestedDriver,
      ...components
  },
  data () {
    return {
      //
    }
  }
}
</script>
