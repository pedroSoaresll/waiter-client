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
  },
  mounted() {
    const driver = this.$store.getters['lead/driver']
    this.$store.dispatch('lead/createDriver', driver.phone_number)
    
    if (!driver) {

    } else {
      console.log('driver encontrado', driver)
      switch (driver.status) {
        case 'PENDING_DOCS':
          this.$router.push({ name: 'FinishForm' })
          break;

        case 'PENDING_BOOKING':
          this.$router.push({ name: 'DoPayment', query: {booking: driver.booking.id} })
          break;
      
        default:
          break;
      }
    }
  }
}
</script>
