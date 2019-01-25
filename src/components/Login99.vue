<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-btn slot="activator" color="primary" dark>Validar na 99 <v-icon v-if=success dark right>check_circle</v-icon></v-btn>
            <v-card>
                <v-card-title class="headline"><img style="margin: 0 auto" src="../assets/99.png"></v-card-title>
                <v-card-text>
                    Informe os 6 primeiros digitos do cartao da 99 e os 4 ultimos
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
                                        Acessando 99
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
                                    md12
                            >
                                <v-text-field
                                        v-model="cardbegin"
                                        :rules="cardbeginRules"
                                        :counter="6"
                                        label="6 primeiros digitos"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="cardend"
                                        :rules="cardendRules"
                                        :counter="4"
                                        label="4 ultimos digitos"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="dialog = false">Não concordo</v-btn>
                    <v-btn color="green darken-1"  flat @click="send99">Logar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import { LOGIN_99 } from '../services/Lead'
    export default {
        name: "Login99",

        data: () => ({
            valid: false,
            dialog: false,
            verify: false,
            cardbegin: null,
            step: '5',
            success: false,
            cardend: null,
            cardbeginRules: [
                v => !!v || 'Os 6 primeiros números são obrigatorios!',
                v => `${v}`.length === 6 || 'O número deve ter 6 dígitos.'
            ],
            cardendRules: [
                v => !!v || 'Os 4 últimos números são obrigatorios!',
                v => `${v}`.length === 4 || 'O número deve ter 4 dígitos.'
            ],
        }),
        methods: {
            send99(val) {
                this.verify = true;
                console.warn(this.valid)
                if (!val) return;
                if (!this.valid) {
                    //this.$store.commit('lead/setSteps', {GET_PHONE: { complete: false, invalid: true}});
                    this.verify = false;
                    return false
                }

                const driver = this.$store.getters['lead/driverId'];
                const phone = this.$store.getters['lead/mobilePhone'];
                const code2fa = this.$store.getters['lead/code2fa'];
                const username = this.$store.getters['lead/cpf'];

                this.$apollo.mutate({
                    mutation: LOGIN_99,
                    variables: {
                        phone,
                        driver,
                        code2fa,
                        username,
                        cardend: this.cardend,
                        cardbegin: this.cardbegin,
                    },
                }).then((result) => {
                    if (result.data.updateLead.id !== undefined) {
                        this.success = true;
                        this.verify = false;
                        this.dialog = false;
                        this.$store.commit('lead/setSteps', {COMPLETE_INFO_APPS: { complete: true, invalid: false}});
                    }

                }).catch((error) => {
                    this.$store.commit('lead/setStep', this.step);
                    this.$store.commit('lead/setSteps', {COMPLETE_INFO_APPS: { complete: false, invalid: true}});
                    this.verify = false;

                    console.error(error)
                })
            },
            isValid() {
                return this.valid;
            }
        }
    }
</script>
