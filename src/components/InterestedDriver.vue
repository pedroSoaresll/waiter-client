<template>
    <v-stepper v-model="step" vertical>


        <!--Passo 1 enviar sms -->
        <v-stepper-step step="1" :complete="steps.GET_PHONE.complete || false"
                        :rules="[() => !steps.GET_PHONE.invalid]">
            Informe seu Celular
        </v-stepper-step>
        <v-stepper-content step="1">
            <v-container>
                <PhoneForm btn-text="Enviar convite" ref="phoneForm"/>
                <v-btn color="primary" @click="sendSms">Enviar Convite</v-btn>
            </v-container>
        </v-stepper-content>
        <!--Fim 1 enviar sms -->


        <!--Passo 2 confirmar sms -->
        <v-stepper-step step="2" :complete="steps.GET_CODE_CONFIRMATION.complete"
                        :rules="[() => !steps.GET_CODE_CONFIRMATION.invalid]">
            Confirme seu cadastro:
        </v-stepper-step>
        <v-stepper-content step="2">
            <v-container>
                <CodePhoneConfirmForm ref="codePhoneConfirmForm"/>
                <v-btn color="primary" @click="verifyPhoneNumber">Válidar</v-btn>
                <v-btn flat @click="step = step-1">Voltar</v-btn>
            </v-container>
        </v-stepper-content>
        <!--Fim 2 confirmar sms -->


        <!--Passo 3 dados basicos -->
        <v-stepper-step step="3" :complete="steps.GET_BASIC.complete" :rules="[() => !steps.GET_BASIC.invalid]">Seus
            Dados
        </v-stepper-step>
        <v-stepper-content step="3">
            <v-container>
                <BasicDriver ref="basicDriver"/>

                <v-btn color="primary" @click="basiInfoLead">Continuar</v-btn>
                <v-btn flat @click="step = step-1">Voltar</v-btn>
            </v-container>
        </v-stepper-content>
        <!--Fim 3 dados basicos -->


        <!--Passo 4 dados adicional -->
        <v-stepper-step step="4" :complete="steps.SEND_SURVEY_DRIVER.complete" :rules="[() => !steps.SEND_SURVEY_DRIVER.invalid]">Informacao adicional</v-stepper-step>
        <v-stepper-content step="4">
            <v-container>
                <SurveyDriver ref="surveyDriver"/>

                <v-btn color="primary" @click="surveyDriver">Continuar</v-btn>
                <v-btn flat @click="step = step-1">Voltar</v-btn>
            </v-container>
        </v-stepper-content>
        <!--Fim 3 dados adicional -->


        <!--Passo 5 dados adicional -->
        <v-stepper-step step="5" v-bind:editable="(step >= 5) ? true : false">Enviar documentacao</v-stepper-step>
        <v-stepper-content step="5">
            <v-container>
                <!--<DocumentsColection/>-->

                <v-btn color="primary" @click="step = step+1">Continuar</v-btn>
                <v-btn flat @click="step = step-1">Voltar</v-btn>
            </v-container>
        </v-stepper-content>
        <!--Fim 5 dados adicional -->
    </v-stepper>
</template>

<script>
    import PhoneForm from './PhoneForm';
    import CodePhoneConfirmForm from './CodePhoneConfirmForm';
    import BasicDriver from './BasicDriver';
    import SurveyDriver from './SurveyDriver';
    import DocumentsColection from './DocumentsColection';

    import {mapGetters} from 'vuex'

    export default {
        components: {
            CodePhoneConfirmForm,
            PhoneForm,
            BasicDriver,
            SurveyDriver,
            //DocumentsColection
        },
        data() {
            return {
                step: this.$store.getters['lead/step'],
                openVerify: false,
            }
        },
        computed: {
            ...mapGetters({
                steps: 'lead/steps',
                mobilePhone: 'lead/mobilePhone',
            }),
        },
        methods: {
            nextStep(n) {
                if (n === this.steps) {
                    this.step = 1
                } else {
                    this.step = n + 1
                }
            },
            sendSms() {
                if (this.$refs.phoneForm.isValid()) {
                    this.$refs.phoneForm.openVerify(true);
                    this.step = 2
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
                    this.step = 4
                }
            },
            surveyDriver() {
                if (this.$refs.surveyDriver.isValid()) {
                    this.$refs.surveyDriver.openVerify(true);
                    this.step = 5
                }
            }
        },

    }
</script>

<style scoped>

</style>
