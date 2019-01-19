<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-btn slot="activator" color="primary" dark>Validar na 99</v-btn>
            <v-card>
                <v-card-title class="headline"><img src="../assets/99.png"></v-card-title>
                <v-card-text>
                    Informe os 6 primeiros digitos do cartao da 99 e os 4 ultimos
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="dialog = false">Não concordo</v-btn>
                    <v-btn color="green darken-1" flat @click="dialog = false">Logar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: "Login99",
        data: () => ({
            dialog: false
        })
    }
</script>
