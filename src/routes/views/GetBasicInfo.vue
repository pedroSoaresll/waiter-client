<template>
  <v-container fluid>
    <v-layout row wrap>
      <restaurant-name/>

      <v-form v-model="isValidForm" class="w-100" @submit.prevent="updateClientName">
        <v-flex row wrap xs12 mt-4>
          <v-text-field
            :rules="nameRules"
            label="Como podemos te chamar?"
            outline v-model.trim="clientName"></v-text-field>
        </v-flex>

        <v-layout row wrap justify-center>
          <v-btn type="submit" :disabled="!isValidForm" color="primary">
            Pode me chamar de {{ clientName }}
          </v-btn>
        </v-layout>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import RestaurantName from '../../components/RestaurantName.vue';

export default {
  name: 'GetBasicInfo',
  components: { RestaurantName },
  data: () => ({
    clientName: '',
    isValidForm: false,
    nameRules: [
      v => !!v || 'Por favor, nos diga como podemos te chamar',
      v => v.length > 2 || 'Seu nome esta pequeno, coloca seu ultimo nome também',
    ],
  }),
  methods: {
    updateClientName() {
      this.$store.dispatch('client/updateName', this.clientName)
        .then(() => this.$router.push({ name: 'Categories' }));
    },
  },
  mounted() {
    this.clientName = this.$store.getters['client/name'] || '';
  },
};
</script>

<style scoped>

</style>
