<template>
    <v-form v-model="valid">
        <v-layout>
            <v-flex
                    xs12
                    md12
            >
                <v-text-field
                        v-model="code2fa"
                        :rules="codeRules"
                        label="Codigo de Verifição"
                        mask="AAAA-NNNN"
                        :counter="9"
                        return-masked-value
                        required
                ></v-text-field>
            </v-flex>
            <v-flex
                    xs2
                    md2
            >
            </v-flex>
        </v-layout>
    </v-form>
</template>
<script>
    import {VERIFY_CODE_LEAD} from '../services/Lead'

    export default {
        props: [],
        data: () => ({
            verify: false,
            skipQuery: true,
            valid: false,
            step: 2,
            code2fa: '',
            codeRules: [
                v => !!v || 'Digite o codigo que recebeu via sms!',
                v => `${v}`.length === 9 || 'O codigo deve ter 9 dígitos.'
            ],
        }),

        mounted() {
            this.code2fa = this.$store.getters['lead/code2fa'];
        },
        apollo: {
            lead: {
                query: VERIFY_CODE_LEAD,
                skip() {
                    return this.skipQuery;
                },
                variables() {
                    return {phone: '', code2fa: ''}
                },
                update: data => data,
                result(data) {
                    if (!data.loading) {
                        if (data.error !== undefined || data.lead === null) {
                            this.valid = false;
                            this.$store.commit('lead/setSteps', {
                                GET_CODE_CONFIRMATION: {
                                    complete: false,
                                    invalid: true
                                }
                            });
                            this.$store.commit('lead/setStep', this.step);

                        } else {

                            this.$store.commit('lead/setSteps', {
                                GET_CODE_CONFIRMATION: {
                                    complete: true,
                                    invalid: !this.valid
                                }
                            });
                            this.$store.commit('lead/setCode2fa', this.code2fa);
                            this.$store.commit('lead/setStep', parseInt(this.step) + 1);
                        }
                        if (data.error === undefined && this.code2fa !== '')
                            this.verify = false;
                        if (data.lead !== null) {
                        }
                    }
                },
            },
        },
        methods: {
            openVerify(val) {
                this.verify = val;
                if (!val) return;
                if (!this.valid) {
                    this.$store.commit('lead/setSteps', {GET_CODE_CONFIRMATION: {complete: false, invalid: true}});
                    this.verify = false;
                    return false
                }

                this.$apollo.queries.lead.skip = false;
                this.$apollo.queries.lead.refetch({
                    phone: this.$store.getters['lead/mobilePhone'],
                    code2fa: this.code2fa,
                })
            },
            isValid() {
                return this.valid;
            }
        },

    }
</script>
