<template>
    <v-form v-model="valid">
        <div class="text-xs-center">
            <v-dialog
                    v-model="verify"
                    hide-overlay
                    persistent
                    width="300"
            >
                <v-card
                        color="primary"
                        dark
                >
                    <v-card-text>
                        Enviando convite para {{mobilePhone}}
                        <v-progress-linear
                                indeterminate
                                color="white"
                                class="mb-0"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <v-layout>
            <v-flex
                    xs12
                    md6
            >
                <v-text-field
                        v-model="mobilePhone"
                        :rules="nameRules"
                        :counter="11"
                        mask="(##) #####-####"
                        label="Celular"
                        required
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script>
    import { CREATE_LEAD } from '../services/Lead'
    export default {
        props: ['phoneNumber'],
        data: () => ({
            valid: false,
            verify: false,
            mobilePhone: '',
            step: '1',
            nameRules: [
                v => !!v || 'Número de celular é obrigatorio!',
                v => `${v}`.length === 11 || 'O número deve ter 11 dígitos com DD.'
            ],
        }),

        mounted() {
           this.mobilePhone = this.$store.getters['lead/mobilePhone']
        },
        methods: {
            openVerify(val) {
                this.verify = val;
                if (!val) return;
                if (!this.valid) {
                    this.$store.commit('lead/setSteps', {GET_PHONE: { complete: false, invalid: true}});
                    this.verify = false;
                    return false
                }

                const phone = `${this.mobilePhone}`;
                const step = `${this.step}`;

                this.$apollo.mutate({
                    mutation: CREATE_LEAD,
                    variables: {
                        phone,
                        step,
                    },
                }).then((result) => {
                    this.verify = false;
                    const { data: { createLead: { id, step: stepQuery, phone_number: phoneQuery }} } = result;
                    this.$store.commit('lead/setDriverId', id);
                    this.$store.commit('lead/setMobilePhone', phoneQuery);
                    this.$store.commit('lead/setStep', parseInt(stepQuery)+1);
                    this.$store.commit('lead/setSteps', {GET_PHONE: { complete: true, invalid: false}});
                    console.log(result);
                }).catch((error) => {
                    this.$store.commit('lead/setStep', this.step);
                    this.$store.commit('lead/setSteps', {GET_PHONE: { complete: false, invalid: true}});
                    this.verify = false;

                    console.error(error)
                })
            },
            isValid() {
                return this.valid;
            }
        },
    }
</script>
