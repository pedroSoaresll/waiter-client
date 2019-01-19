<template>
    <v-form v-model="valid">

        <v-layout
                wrap
                justify-space-between
        >

            <v-flex xs12 md4>
                <v-text-field
                        v-model="license_number"
                        prepend-icon="person"
                        label="CNH"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="address_postal_code"
                        prepend-icon="person"
                        label="cep"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="address_street_name"
                        prepend-icon="person"
                        label="Endereco:"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="address_street_no_number"
                        prepend-icon="person"
                        label="Numero:"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="address_street_details"
                        prepend-icon="person"
                        label="Complemento:"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="address_neighborhood"
                        prepend-icon="person"
                        label="Bairro:"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="address_city"
                        prepend-icon="person"
                        label="Cidade:"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="address_state"
                        prepend-icon="person"
                        label="Estado:"
                        required
                ></v-text-field>
            </v-flex>


            <v-flex xs12 md4>
                <v-text-field
                        v-model="emergency_1_phone_number"
                        prepend-icon="phone"
                        label="Telefone emergencia"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="emergency_1_name"
                        prepend-icon="phone"
                        label="Nome para contato"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="emergency_2_phone_number"
                        prepend-icon="phone"
                        label="Telefone emergencia 2"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="emergency_2_name"
                        prepend-icon="phone"
                        label="Nome contato 2"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <upload-input title="Foto CNH" :file-changed-callback="fileCnh"></upload-input>
            </v-flex>

            <v-flex xs12 md4>
                <upload-input title="Foto Garage" :file-changed-callback="fileGarage"></upload-input>
            </v-flex>

            <v-flex xs12 md4>
                <upload-input title="Comprovante de residencia" :file-changed-callback="fileAddress"></upload-input>
            </v-flex>

        </v-layout>
    </v-form>
</template>
<script>
    import UploadInput from './UploadInput';
    import {COMPLETE_INFO} from '../services/Lead';
    import axios from 'axios';

    export default {
        components: {UploadInput},
        data: () => ({
            step: '5',
            valid: false,
            objSend: {},

            license_number: '',
            emergency_2_name: null,
            emergency_2_phone_number: null,
            emergency_1_name: null,
            emergency_1_phone_number: null,
            address_state: null,
            address_city: null,
            address_neighborhood: null,
            address_street_details: null,
            address_street_no_number: null,
            address_street_name: null,
            address_postal_code: null,
        }),
        methods: {
            fileCnh({imageUrl, imageFile}) {
                this.objSend = {...this.objSend, cnh_photo: imageFile};
            },
            fileGarage({imageUrl, imageFile}) {
                this.objSend = {...this.objSend, garage_photo: imageFile};

            },
            fileAddress({imageUrl, imageFile}) {
                this.objSend = {...this.objSend, address_photo: imageFile};
                console.warn(this.objSend)
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

                this.objSend = {...this.objSend, driverId: this.$store.getters['lead/driverId']};
                const form_data = new FormData();
                for (let key in this.objSend) {
                    form_data.append(key, this.objSend[key]);
                }

                const {
                    license_number,
                    emergency_2_name,
                    emergency_2_phone_number,
                    emergency_1_name,
                    emergency_1_phone_number,
                    address_state,
                    address_city,
                    address_neighborhood,
                    address_street_details,
                    address_street_no_number,
                    address_street_name,
                    address_postal_code,
                } = this;

                const infoDoc = {
                    license_number,
                    emergency_2_name,
                    emergency_2_phone_number,
                    emergency_1_name,
                    emergency_1_phone_number,
                    address_state,
                    address_city,
                    address_neighborhood,
                    address_street_details,
                    address_street_no_number: parseInt(address_street_no_number),
                    address_street_name,
                    address_postal_code,
                };

                const _error = () => {
                    this.$store.commit('lead/setSteps', {SEND_DOCUMENTS: { complete: false, invalid: true}});
                }

                const success = (dataDoc) => {
                    this.$store.commit('lead/setSteps', {SEND_DOCUMENTS: { complete: true, invalid: false}});
                    this.$store.commit('lead/setStep', parseInt(this.step) + 1);
                    this.$store.commit('lead/setInfo', dataDoc);
                };

                const sendGraph = (dataDoc) => {

                    this.$apollo.mutate({
                        mutation: COMPLETE_INFO,
                        variables: {
                            ...dataDoc,
                            step: this.step,
                            phone: this.$store.getters['lead/mobilePhone'],
                            code2fa: this.$store.getters['lead/code2fa'],
                        },
                    }).then((result) => {
                        success(dataDoc)
                    }).catch((error) => {
                        _error()
                    })
                };


                axios.post(`${process.env.URL_PREFIX}/documents`, form_data)
                    .then(res => {
                        sendGraph(infoDoc)
                    }).catch(e => _error())

            },
            isValid() {
                return true;
            }
        }
    }
</script>
