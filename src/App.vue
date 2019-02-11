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
  async mounted() {
    const driver = this.$store.getters["lead/driver"];
    const sessionPhoneNumber = sessionStorage.getItem("kovi_phone");
    if (sessionPhoneNumber && driver.phone_number) {
      await this.$store.dispatch("lead/createDriver", driver.phone_number);
    }
    this.$store.dispatch("lead/restoreActivity");
  }
};
</script>
