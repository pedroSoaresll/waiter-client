<!--suppress ALL -->
<template>
    <v-form v-model="valid">

            <v-layout
                    wrap
                    justify-space-between
            >
                <v-flex xs12 md4 >
                    <v-switch
                            v-model="survey_be_over_21"
                            label="Tenho mais que 21 anos"
                    ></v-switch>
                </v-flex>
                <v-flex
                        xs12
                        md4
                >
                    <v-switch
                            v-model="survey_has_garage"
                            label="Possuo garaje em minha localidade"
                    ></v-switch>
                </v-flex>
                <v-flex
                        xs12
                        md4
                >
                    <v-switch
                            v-model="survey_low_points"
                            label="Possuo 0 até 13 pontos na carteira"
                    ></v-switch>
                </v-flex>
                <v-flex
                        xs6
                        md12
                >
                    <v-checkbox
                            v-model="survey_app_99"
                            label="Sou motorista da 99"
                    ></v-checkbox>
                </v-flex>
                <v-flex
                        xs6
                        md12
                >
                    <v-checkbox
                            v-model="survey_app_uber"
                            label="Sou motorista da Uber"
                    ></v-checkbox>
                </v-flex>
            </v-layout>
    </v-form>
</template>
<script>
    import {SURVEY_DRIVER} from '../services/Lead'

    export default {
        props: ['phoneNumber'],
        data: () => ({
            valid: true,
            survey_app_99: false,
            survey_app_uber: false,
            survey_be_over_21: false,
            survey_has_garage: false,
            survey_low_points: false,
            verify: false,
            mobilePhone: '',
            step: '4',
        }),

        methods: {
            openVerify(val) {
                this.verify = val;
                if (!val) return;

                const {
                    survey_app_99,
                    survey_app_uber,
                    survey_be_over_21,
                    survey_has_garage,
                    survey_low_points,
                    step } = this;

                this.$apollo.mutate({
                    mutation: SURVEY_DRIVER,
                    variables: {
                        phone: this.$store.getters['lead/mobilePhone'],
                        code2fa: this.$store.getters['lead/code2fa'],
                        survey_app_99,
                        survey_app_uber,
                        survey_be_over_21,
                        survey_has_garage,
                        survey_low_points,
                        step
                    },
                }).then((result) => {
                    this.verify = false;
                    const {data: {updateLead: { id }}} = result;
                    if (id === this.$store.getters['lead/driverId']) {
                        this.$store.commit('lead/setSurvey', {
                            survey_app_99,
                            survey_app_uber,
                            survey_has_garage,
                            survey_low_points
                        });
                        this.$store.commit('lead/setSteps', {SEND_SURVEY_DRIVER: { complete: true, invalid: !this.valid}});
                        this.$store.commit('lead/setStep', parseInt(this.step) + 1);

                    }

                }).catch((error) => {
                    alert(`Error from ${error}`)
                    this.verify = false;
                    this.$store.commit('lead/setSteps', {SEND_SURVEY_DRIVER: { complete: false, invalid: !this.valid}});
                    this.$store.commit('lead/setStep', this.step);
                    console.error(error)
                })
            },
            isValid() {
                this.$store.commit('lead/setSteps', {SEND_SURVEY_DRIVER: { complete: false, invalid: !this.valid}});
                return this.valid;
            }
        },
    }
</script>
