<template>
    <v-form v-model="valid">

            <v-layout
                    wrap
                    justify-space-between
            >
                <v-flex xs12
                        md12 >
                    <v-select
                            :items="items"
                            v-model="paymentType"
                            label="Forma de Pagamento"
                    ></v-select>
                </v-flex>

                <div v-if="paymentType !== 'Boleto'">
                    <v-flex

                            xs12
                            md5
                    >
                        <v-text-field
                                v-model="cc_holder_name"
                                label="Nome do titular:"
                                prepend-icon="credit_card"
                                required
                                :rules="cc_holder_nameRules"
                        ></v-text-field>
                    </v-flex>
                    <v-flex

                            xs12
                            md5
                    >
                        <v-text-field
                                v-model="cc_holder_cpf"
                                label="Cpf do titular:"
                                prepend-icon="credit_card"
                                :rules="cc_holder_cpfRules"
                                required
                        ></v-text-field>
                    </v-flex>
                    <v-flex

                            xs12
                            md5
                    >
                        <v-text-field
                                v-model="cc_number"
                                label="Numero:"
                                prepend-icon="credit_card"
                                mask="###.###.###-##"

                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="cc_expired_at"
                                label="Data Venciemnto:"
                                mask="##/####"
                                prepend-icon="credit_card"
                                required
                        ></v-text-field>

                    </v-flex>

                </div>

            </v-layout>
    </v-form>
</template>
<script>
    import {PAYMENT} from '../services/Lead'
    import store from '../store';

    export default {
        props: ['phoneNumber'],
        data: () => ({
            valid: false,
            verify: false,
            paymentType: 'cartão de crédito',
            items: ['cartão de crédito', 'Boleto'],
            cc_holder_name: '',
            cc_holder_cpf: '',
            cc_number: '',
            cc_expired_at: '',
            cc_holder_nameRules: [
                v => !!v || 'Nome do titular é obrigatorio!',
            ],
            cc_holder_cpfRules: [
                v => !!v || 'CPF do titular é obrigatorio!',
            ],
            cc_numberRules: [
                v => !!v || 'Numero do cartao é obrigatorio!',
            ],
            cc_expired_atRules: [
                v => !!v || 'Data de vencimento é obrigatorio!',
            ],
            step: '7',
        }),
        methods: {
            openVerify(val) {
                this.verify = val;
                if (!val) return;

                const {cc_holder_name, cc_holder_cpf, cc_number, cc_expired_at, paymentType } = this;
                const driver = this.$store.getters['lead/driverId'];

                this.$apollo.mutate({
                    mutation: PAYMENT,
                    variables: {
                        phone: this.$store.getters['lead/mobilePhone'],
                        code2fa: this.$store.getters['lead/code2fa'],
                        driver,
                        cc_holder_name,
                        cc_holder_cpf,
                        cc_number,
                        cc_expired_at,
                        type: paymentType === 'Boleto' ? 'boleto' : 'credit_card',
                    },
                }).then((result) => {
                    this.verify = false;

                    this.$store.commit('lead/setSteps', {COMPLETE_INFO_PAYMENT: { complete: true, invalid: false}});
                    this.$store.commit('lead/setStep', this.step);

                }).catch((error) => {
                    this.verify = false;
                    this.$store.commit('lead/setSteps', {COMPLETE_INFO_PAYMENT: { complete: false, invalid: !this.valid}});
                    this.$store.commit('lead/setStep', this.step);

                    console.error(error)
                })
            },
            isValid() {


                if (this.valid) {
                    this.$store.commit('lead/setSteps', {COMPLETE_INFO_PAYMENT: { complete: true, invalid: false}});
                    return this.valid;
                } else {
                    this.$store.commit('lead/setSteps', {COMPLETE_INFO_PAYMENT: { complete: true, invalid: false}});

                }
                if (this.paymentType === 'Boleto') {
                    this.$store.commit('lead/setSteps', {COMPLETE_INFO_PAYMENT: { complete: true, invalid: false}});
                    return true;
                }

            }
        },
    }
</script>
