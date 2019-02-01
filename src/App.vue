<template>
  <v-app>
    <router-view></router-view>
    <!-- <v-content>
      <InterestedDriver/>
    </v-content>-->
  </v-app>
</template>

<script>
// import InterestedDriver from './components/InterestedDriver'
import { components } from "aws-amplify-vue";

export default {
  name: "App",
  components: {
    // InterestedDriver,
    ...components
  },
  data() {
    return {
      //
    };
  },
  methods: {
    loadUserData(driver) {
      if (!driver) {
        if (this.$route.fullPath !== '/')
          this.$router.push({ name: 'Home' })
      } else {
        switch (driver.status) {
          case "PENDING_DOCS":
            this.$router.push({ name: "FinishForm" });
            break;

          case "PENDING_BOOKING":
            this.$router.push({
              name: "DoPayment",
              query: { booking: driver.booking.id }
            });
            break;

          default:
            if (sessionStorage.getItem('kovi_code2fs'))
              return this.$router.push({
                name: "FirstData"
              })

            return this.$router.push({
              name: "Home"
            })
        }
      }
    }
  },
  mounted() {
    const driver = this.$store.getters["lead/driver"];
    const sessionPhoneNumber = sessionStorage.getItem('kovi_phone')
    if (sessionPhoneNumber && driver.phone_number) {
      this.$store.dispatch("lead/createDriver", driver.phone_number);
    }
    this.loadUserData(driver);
  },
};
</script>
