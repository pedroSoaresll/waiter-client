<template>
    <v-form v-model="valid">

            <v-layout
                    wrap
                    justify-space-between
            >
                <v-flex xs12 md4 >

                </v-flex>

                <v-flex xs12 md4 >
                    <Login99></Login99>
                </v-flex>
            </v-layout>
    </v-form>
</template>
<script>
    import {BASIC_INFORMATION} from '../services/Lead'
    import store from '../store';
    import Login99 from "./Login99";

    export default {
        components: {Login99},
        props: ['phoneNumber'],
        data: () => ({
            city: null,
            cpf: null,
            citys: [
                'São Paulo', 'Rio de Janeiro', 'Belo-orizonte', 'Curitiba', 'Grande São Paulo'],
            valid: false,
            verify: false,
            mobilePhone: '',
            email: '',
            name: '',
            step: '3',
            nameRules: [
                v => !!v || 'Nome é obrigatorio!'
            ],
            cpfRules: [
                v => !!v || 'Nome é obrigatorio!'
            ],
            cityRules: [
                v => !!v || 'Cidade é obrigatorio!'
            ],
            emailRules: [
                v => !!v || 'E-mail é obrigatorio!',
                v => /.+@.+/.test(v) || 'E-mail inválido'
            ]
        }),
        mounted() {
            this.email = this.$store.getters['lead/email'];
            this.name = this.$store.getters['lead/name'];
            this.city = this.$store.getters['lead/work_city'];
        },
        methods: {
            loginUber() {
                axios.post(`${process.env.URL_PREFIX}/uber/auth/authorization`, form_data)
                    .then(res => {
                        window.open(res.url, res.open);
                    }).catch(e => console.log(e))
            },
            login99() {
                axios.post(`${process.env.URL_PREFIX}/uber/auth/authorization`, form_data)
                    .then(res => {
                        window.open(res.url, res.open);
                    }).catch(e => console.log(e))
            },
            isValid() {
                this.$store.commit('lead/setSteps', {GET_BASIC: { complete: false, invalid: !this.valid}});
                return this.valid;
            }
        },
    }
</script>
