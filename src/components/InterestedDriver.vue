<template>
  <v-stepper v-model="step" vertical>
    <!--Passo 1 enviar sms -->
    <v-stepper-step
      step="1"
      :complete="steps.GET_PHONE.complete || false"
      :rules="[() => !steps.GET_PHONE.invalid]"
    >
      Informe seu Celular
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-container>
        <PhoneForm btn-text="Enviar convite" ref="phoneForm" />
        <v-btn color="primary" @click="sendSms">Enviar Convite</v-btn>
      </v-container>
    </v-stepper-content>
    <!--Fim 1 enviar sms -->

    <!--Passo 2 confirmar sms -->
    <v-stepper-step
      step="2"
      :complete="steps.GET_CODE_CONFIRMATION.complete"
      :rules="[() => !steps.GET_CODE_CONFIRMATION.invalid]"
    >
      Confirme seu cadastro:
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-container>
        <CodePhoneConfirmForm ref="codePhoneConfirmForm" />
        <v-btn color="primary" @click="verifyPhoneNumber">Válidar</v-btn>
        <v-btn flat @click="step = step - 1">Voltar</v-btn>
      </v-container>
    </v-stepper-content>
    <!--Fim 2 confirmar sms -->

    <!--Passo 3 dados basicos -->
    <v-stepper-step
      step="3"
      :complete="steps.GET_BASIC.complete"
      :rules="[() => !steps.GET_BASIC.invalid]"
      >Seus Dados
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-container>
        <BasicDriver ref="basicDriver" />

        <v-btn color="primary" @click="basiInfoLead">Continuar</v-btn>
        <v-btn flat @click="step = step - 1">Voltar</v-btn>
      </v-container>
    </v-stepper-content>
    <!--Fim 3 dados basicos -->

    <!--Passo 4 dados adicional -->
    <v-stepper-step
      step="4"
      :complete="steps.SEND_SURVEY_DRIVER.complete"
      :rules="[() => !steps.SEND_SURVEY_DRIVER.invalid]"
      >Informacao adicional</v-stepper-step
    >
    <v-stepper-content step="4">
      <v-container>
        <SurveyDriver ref="surveyDriver" />

        <v-btn color="primary" @click="surveyDriver">Continuar</v-btn>
        <v-btn flat @click="step = step - 1">Voltar</v-btn>
      </v-container>
    </v-stepper-content>
    <!--Fim 3 dados adicional -->

    <!--Passo 5 dados adicional -->
    <v-stepper-step
      step="5"
      :complete="steps.SEND_DOCUMENTS.complete"
      :rules="[() => !steps.SEND_DOCUMENTS.invalid]"
      >Enviar documentos</v-stepper-step
    >
    <v-stepper-content step="5">
      <v-container>
        <DocumentsColection ref="documentsColection" />

        <v-btn color="primary" @click="documentsColection">Continuar</v-btn>
        <v-btn flat @click="step = step - 1">Voltar</v-btn>
      </v-container>
    </v-stepper-content>
    <!--Fim 5 dados adicional -->

    <!--Passo 6 dados apps -->
    <v-stepper-step
      step="6"
      :complete="steps.COMPLETE_INFO_APPS.complete"
      :rules="[() => !steps.COMPLETE_INFO_APPS.invalid]"
      >Aplicativos</v-stepper-step
    >
    <v-stepper-content step="6">
      <v-container>
        <AppsDriver />

        <v-btn color="primary" @click="step = step + 1">Continuar</v-btn>
        <v-btn flat @click="step = step - 1">Voltar</v-btn>
      </v-container>
    </v-stepper-content>
    <!--Fim 6 dados apps -->

    <!--Passo 7 -->
    <v-stepper-step
      step="7"
      :complete="steps.COMPLETE_INFO_PAYMENT.complete"
      :rules="[() => !steps.COMPLETE_INFO_PAYMENT.invalid]"
      >Pagamento</v-stepper-step
    >
    <v-stepper-content step="7">
      <v-container>
        <Payments ref="payments" />

        <v-btn color="primary" @click="payments">Continuar</v-btn>
        <v-btn flat @click="step = step - 1">Voltar</v-btn>
      </v-container>
    </v-stepper-content>
    <!--Fim 7  -->

    <!--Passo 8 -->
    <v-stepper-step
      step="8"
      :complete="steps.SEND_DOCUMENTS.complete"
      :rules="[() => !steps.SEND_DOCUMENTS.invalid]"
      >Reserva do carro:</v-stepper-step
    >
    <v-stepper-content step="8">
      <v-container>
        <!--<DocumentsColection ref="documentsColection"/>-->

        <v-btn color="primary" @click="step = step + 1">Continuar</v-btn>
        <v-btn flat @click="step = step - 1">Voltar</v-btn>
      </v-container>
    </v-stepper-content>
    <!--Fim 8 -->
  </v-stepper>
</template>

<script>
import PhoneForm from "./PhoneForm";
import CodePhoneConfirmForm from "./CodePhoneConfirmForm";
import BasicDriver from "./BasicDriver";
import SurveyDriver from "./SurveyDriver";
import DocumentsColection from "./DocumentsColection";
import Payments from "./Payments";

import { mapGetters } from "vuex";
import AppsDriver from "./AppsDriver";

export default {
  components: {
    AppsDriver,
    DocumentsColection,
    CodePhoneConfirmForm,
    PhoneForm,
    BasicDriver,
    SurveyDriver,
    Payments
  },
  data() {
    return {
      step: this.$store.getters["lead/step"],
      openVerify: false
    };
  },
  computed: {
    ...mapGetters({
      steps: "lead/steps",
      mobilePhone: "lead/mobilePhone"
    })
  },
  methods: {
    sendSms() {
      if (this.$refs.phoneForm.isValid()) {
        this.$refs.phoneForm.openVerify(true);
        this.step = 2;
      }
    },
    verifyPhoneNumber() {
      if (this.$refs.codePhoneConfirmForm.isValid()) {
        this.$refs.codePhoneConfirmForm.openVerify(true);
        this.step = 3;
      }
    },
    basiInfoLead() {
      if (this.$refs.basicDriver.isValid()) {
        this.$refs.basicDriver.openVerify(true);
        this.step = 4;
      }
    },
    surveyDriver() {
      if (this.$refs.surveyDriver.isValid()) {
        this.$refs.surveyDriver.openVerify(true);
        this.step = 5;
      }
    },
    documentsColection() {
      if (this.$refs.documentsColection.isValid()) {
        this.$refs.documentsColection.openVerify(true);
        this.step = 6;
      }
    },
    payments() {
      if (this.$refs.payments.isValid()) {
        this.$refs.payments.openVerify(true);
        this.step = 8;
      }
    }
  }
};
</script>

<style scoped></style>
