<template>
    <v-form v-model="valid">

            <v-layout
                    wrap
                    justify-space-between
            >
                <v-flex xs12 md4 >
                    <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            prepend-icon="person"
                            label="Nome completo"
                            required
                    ></v-text-field>
                </v-flex>
                <v-flex
                        xs12
                        md5
                >
                    <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            prepend-icon="email"
                            required
                    ></v-text-field>
                </v-flex>
                <v-flex
                        xs12
                        md3
                >
                    <v-autocomplete
                            v-model="city"
                            :rules="cityRules"
                            :items="citys"
                            :label="`Cidade que percorre`"
                            persistent-hint
                            prepend-icon="location_city"
                            autocomplete="off"
                    >
                    </v-autocomplete>
                </v-flex>
            </v-layout>
    </v-form>
</template>
<script>
    import {BASIC_INFORMATION} from '../services/Lead'
    import store from '../store';

    export default {
        props: ['phoneNumber'],
        data: () => ({
            city: null,
            citys: [
                'São Paulo', 'Rio de Janeiro', 'Belo-orizonte', 'Curitiba', 'Grande São Paulo',
            ],
            valid: false,
            verify: false,
            mobilePhone: '',
            email: '',
            name: '',
            step: 3,
            nameRules: [
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
            openVerify(val) {
                this.verify = val;
                if (!val) return;

                const {city, name, email, step } = this;

                this.$apollo.mutate({
                    mutation: BASIC_INFORMATION,
                    variables: {
                        phone: this.$store.getters['lead/mobilePhone'],
                        code2fa: this.$store.getters['lead/code2fa'],
                        city,
                        name,
                        email,
                        step: `${step}`
                    },
                }).then((result) => {
                    this.verify = false;
                    const {data: {updateLead: {id, code2fa, email}}} = result;
                    this.$store.commit('lead/setDriverId', id);
                    this.$store.commit('lead/setEmail', email);
                    this.$store.commit('lead/setWorkCity', city);
                    this.$store.commit('lead/setName', name);
                    this.$store.commit('lead/setSteps', {GET_BASIC: { complete: true, invalid: !this.valid}});
                }).catch((error) => {
                    alert(`Error from ${error}`)
                    this.verify = false;
                    this.$store.commit('lead/setSteps', {GET_BASIC: { complete: false, invalid: !this.valid}});

                    console.error(error)
                })
            },
            isValid() {
                this.$store.commit('lead/setSteps', {GET_BASIC: { complete: false, invalid: !this.valid}});
                return this.valid;
            }
        },
    }
</script>
