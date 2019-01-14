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
    import {CREATE_LEAD} from '../services/Lead'
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
            step: 'BASIC_DRIVER',
            nameRules: [
                v => !!v || 'Nome é obrigatorio!'
            ],
            emailRules: [
                v => !!v || 'E-mail é obrigatorio!',
                v => /.+@.+/.test(v) || 'E-mail inválido'
            ]
        }),

        methods: {
            openVerify(val) {
                this.verify = val;
                if (!val) return;

                const { phone, city, name, email } = this;
                const step = this.step;

                this.$apollo.mutate({
                    mutation: BASIC_INFORMATION,
                    variables: {
                        phone,
                        step,
                    },
                }).then((result) => {
                    this.verify = false;
                    const {data: {createLead: {id}}} = result;
                    console.log(result);
                }).catch((error) => {
                    alert(`Error from ${error}`)
                    this.verify = false;

                    console.error(error)
                })
            },
        },
    }
</script>
