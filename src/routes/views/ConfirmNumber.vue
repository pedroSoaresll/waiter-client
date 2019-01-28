<template>
  <v-layout column wrap class="layout">
    <v-flex xs12>
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <v-flex column wrap xs12 class="mt-5">
      <p class="text-verifique-cadastro">Verifique seu telefone</p>
      <p class="text-digite-abaixo">Digite abaixo o código enviado para o número <strong>11956088844</strong>.
      </p>
    </v-flex>

    <v-flex column wrap xs12 align-self-center class="mt-5">
			<span class="text-kovi text-uppercase font-weight-bold">Kovi</span>
			<span class="text-kovi text-uppercase font-weight-bold ml-3">-</span>
			<input type="text" class="input-code" placeholder="0" max="1" maxlength="1">
			<input type="text" class="input-code ml-2" placeholder="0" max="1" maxlength="1">
			<input type="text" class="input-code ml-2" placeholder="0" max="1" maxlength="1">
			<input type="text" class="input-code ml-2" placeholder="0" max="1" maxlength="1">
		</v-flex>

    <v-flex column wrap xs12 class="mt-5">
      <p class="text-enviar-codigo">Enviar código novamente.</p>
    </v-flex>

    <v-flex column wrap xs12 align-self-center class="mt-5">
      <v-btn class="btn-radius btn-pink" large="true">Confirmar Código</v-btn>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.layout {
  background-color: #ffffff;
  padding: 30px 20px;
}

.text-kovi {
	color: rgba(74,74,74,0.8);
	font-size: 50px;
}

.input-code {
	border: none;
	border-bottom: 4px solid #4A4A4A;
	width: 33px;
	font-size: 50px;
	color: rgba(74,74,74,0.8);
	text-align: center;
	text-transform: uppercase;
	outline: none;
} .input-code::placeholder {
	opacity: .3;
}

.text-verifique-cadastro {
	font-size: 20px;
}

.text-digite-abaixo {
	font-size: 16px;
	opacity: 0.6;
}

.text-enviar-codigo {
	font-size: 16px;
	color: #FF3859;
}

.btn-radius {
  border-radius: 22.5pt;
}

.btn-pink {
	background-color: #FF3859 !important;
	color: #ffffff;
}
</style>

