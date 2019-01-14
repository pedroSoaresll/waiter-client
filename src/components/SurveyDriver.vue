<template>
    <v-form v-model="valid">

            <v-layout
                    wrap
                    justify-space-between
            >
                <v-flex xs12 md4 >
                    <v-switch
                            v-model="age"
                            label="Tenho mais que 21 anos"
                    ></v-switch>
                </v-flex>
                <v-flex
                        xs12
                        md4
                >
                    <v-switch
                            v-model="garage"
                            label="Possuo garaje em minha localidade"
                    ></v-switch>
                </v-flex>
                <v-flex
                        xs12
                        md4
                >
                    <v-switch
                            v-model="cnhPoints"
                            label="Possuo 0 até 13 pontos na carteira"
                    ></v-switch>
                </v-flex>
                <v-flex
                        xs6
                        md12
                >
                    <v-checkbox
                            v-model="app99"
                            label="Sou motorista da 99"
                    ></v-checkbox>
                </v-flex>
                <v-flex
                        xs6
                        md12
                >
                    <v-checkbox
                            v-model="appUber"
                            label="Sou motorista da Uber"
                    ></v-checkbox>
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
            appUber: false,
            app99: false,
            cnhPoints: false,
            garage: false,
            age: false,
            verify: false,
            mobilePhone: '',
            step: 'SURVEY_DRIVER',
        }),

        methods: {
            openVerify(val) {
                this.verify = val;
                if (!val) return;

                const {age, step, mobilePhone: phone, cnhPoints, app99: driver99, appUber: driverUber, garage} = this;
                this.$apollo.mutate({
                    mutation: SURVEY_DRIVER,
                    variables: {
                        phone,
                        step,
                        driver99,
                        driverUber,
                        cnhPoints,
                        age,
                        garage
                    },
                }).then((result) => {
                    this.verify = false;

                }).catch((error) => {
                    alert(`Error from ${error}`)
                    this.verify = false;

                    console.error(error)
                })
            },
        },
    }
</script>
