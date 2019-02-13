<template>
  <v-form v-model="valid">
    <v-layout wrap justify-space-between>
      <v-flex xs12 md4> </v-flex>

      <v-flex xs12 md4>
        <Login99></Login99>
      </v-flex>
    </v-layout>
  </v-form>
</template>
<script>
import store from "../store";
import Login99 from "./Login99";
import { mapGetters } from "vuex";

export default {
  components: { Login99 },
  props: ["phoneNumber"],
  data: () => ({
    valid: false
  }),

  methods: {
    loginUber() {
      axios
        .post(
          `${process.env.VEU_APP_URL_PREFIX}/uber/auth/authorization`,
          form_data
        )
        .then(res => {
          window.open(res.url, res.open);
        })
        .catch(e => console.log(e));
    },
    computed: {
      ...mapGetters({
        steps: "lead/steps"
      })
    },
    isValid() {
      return this.valid;
    }
  }
};
</script>
