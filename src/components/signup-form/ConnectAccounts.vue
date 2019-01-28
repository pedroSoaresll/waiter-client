<template>
  <v-layout column wrap class="step1">
    <v-flex column wrap xs12 class="wrapper">
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <!-- steps here -->
    <v-layout column wrap class="wrapper">
      <v-flex column wrap xs12>
        <p class="text-qual-empresa mb-0">Conecte suas contas</p>
        <p
          class="text-para-acelerar text-16px mt-2"
        >Conectando suas contas você garante prioridade para o recebimento do seu carro, é super simples ;)</p>
      </v-flex>

      <v-flex column wrap class="wrapper" align-self-center>
        <v-btn block round outline color="success" class="mt-4" large="true">Conta Uber Adicionada!</v-btn>
        <v-btn block round outline class="mt-4" large="true">Adicionar Conta 99</v-btn>

        <v-dialog width="500">
          <v-btn
            slot="activator"
            block
            round
            outline
            class="mt-4"
            large="true"
          >Adicionar Conta Cabify</v-btn>

          <v-card class="wrapper">
            <v-layout column wrap>
              <p class="text-envie-historico">Por favor, envie o seu histórico de corridas</p>
              <upload-input title="Foto do perfil" :file-changed-callback="uploadImage"></upload-input>

              <v-btn round class="btn-pink" large="true">Salvar</v-btn>
              <v-flex column wrap xs12 align-self-center>
                <v-btn flat small large="true">Cancelar</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-flex>

      <v-flex column wrap xs12 align-self-center class="mt-3">
        <v-btn round class="btn-pink" large="true">Avançar</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import UploadInput from "../UploadInput";
export default {
  components: {
    UploadInput
  },
  methods: {
    uploadImage() {}
  }
};
</script>


<style scoped>
.wrapper {
  background-color: #ffffff;
  padding: 30px 20px;
}

.area-checkbox {
  height: 20px;
}

.step1 {
  font-size: 20px;
}

.text-16px {
  font-size: 16px;
}

.text-18px {
  font-size: 18px;
}

.btn-pink {
  background-color: #ff3859 !important;
  color: #ffffff;
}

.text-para-acelerar {
  opacity: 0.6;
}

.text-envie-historico {
  font-size: 20px;
}
</style>
