<template>
    <v-form v-model="valid">

            <v-layout
                    wrap
                    justify-space-between
            >
                <v-flex xs12 md4 >
                    <v-text-field
                            v-model="cpf"
                            prepend-icon="person"
                            label="CPF"
                            mask="###.###.###-##"
                            required
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 md4 >
                    <v-text-field
                            v-model="cnh"
                            prepend-icon="person"
                            label="CNH"
                            required
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 md4 >
                    <v-text-field
                            v-model="cep"
                            prepend-icon="person"
                            label="cep"
                            required
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 md4 >
                    <v-text-field
                            v-model="number"
                            prepend-icon="person"
                            label="Número"
                            required
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 md4 >
                    <v-text-field
                            v-model="complement"
                            prepend-icon="person"
                            label="Complemento"
                            required
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 md4 >
                    <v-text-field
                            v-model="emergency"
                            prepend-icon="phone"
                            label="Telefone emergencia"
                            required
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 md4 >
                    <upload-input title="Foto CNH" :file-changed-callback="fileCnh"></upload-input>
                </v-flex>

                <v-flex xs12 md4 >
                    <upload-input title="Foto Garage" :file-changed-callback="fileGarage"></upload-input>
                </v-flex>

                <v-flex xs12 md4 >
                    <upload-input title="Foto sua" :file-changed-callback="fileAvatar"></upload-input>
                </v-flex>

            </v-layout>
    </v-form>
</template>
<script>
    import UploadInput from './UploadInput';

    export default {
        components: {UploadInput},
        data: () => ({
            valid: false,
            cpf: '',
            cnh: '',
            cep: '',
            number: '',
            complement: '',
            emergency: '',
            cnhFile: '',
            garageFile: '',
            avatarFile: '',
        }),
        methods: {
            fileCnh ({ imageUrl, imageFile }) {
                this.cnhFile = imageFile;
            },
            fileGarage ({ imageUrl, imageFile }) {
                this.garageFile = imageFile;
            },
            fileAvatar ({ imageUrl, imageFile }) {
                this.avatarFile = imageFile;
            },
            openVerify(val) {
                this.verify = val;
                if (!val) return;
                if (!this.valid) {
                    this.verify = false;
                    return false
                }

                const phone = this.mobilePhone;
                const step = this.step;

                this.$apollo.mutate({
                    mutation:'' ,
                    variables: {
                        phone,
                        step,
                    },
                }).then((result) => {
                    this.verify = false;
                    console.log(result);
                }).catch((error) => {
                    console.error(error)
                })
            },
            isValid() {
                return this.valid;
            }
        }
    }
</script>
