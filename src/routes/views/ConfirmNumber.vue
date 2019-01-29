<template>
  <v-layout column wrap class="layout">
    <v-flex xs12>
      <img :src="require('../../assets/kovi-logo-red.svg')" alt="logo kovi">
    </v-flex>

    <v-flex column wrap xs12 class="mt-5">
      <p class="text-verifique-cadastro">Verifique seu telefone</p>
      <p class="text-digite-abaixo">
        Digite abaixo o código enviado para o número
        <strong>11956088844</strong>.
      </p>
    </v-flex>

    <v-flex column wrap xs12 align-self-center class="mt-5">
      <span class="text-kovi text-uppercase font-weight-bold">Kovi</span>
      <span class="text-kovi text-uppercase font-weight-bold ml-3">-</span>
      <input
        ref="space1"
        v-model="space1"
        type="text"
        class="input-code"
        placeholder="0"
        max="1"
        maxlength="1"
        @keyup="handleSpace($event, $refs.space2, null)"
      >
      <input
        ref="space2"
        v-model="space2"
        type="text"
        class="input-code ml-2"
        placeholder="0"
        max="1"
        maxlength="1"
        @keyup="handleSpace($event, $refs.space3, $refs.space1)"
      >
      <input
        ref="space3"
        v-model="space3"
        type="text"
        class="input-code ml-2"
        placeholder="0"
        max="1"
        maxlength="1"
        @keyup="handleSpace($event, $refs.space4, $refs.space2)"
      >
      <input
        ref="space4"
        v-model="space4"
        type="text"
        class="input-code ml-2"
        placeholder="0"
        max="1"
        maxlength="1"
        @keyup="handleSpace($event, null, $refs.space3)"
      >
    </v-flex>

    <v-flex column wrap xs12 class="mt-5">
      <a
        href="javascript:void(0)"
        @click="generateCode2fa"
        class="text-enviar-codigo"
      >Enviar código novamente.</a>
    </v-flex>

    <v-flex column wrap xs12 align-self-center class="mt-5" v-if="code2faVerified && !code2fa">
      <p class="text-mensage-erro">Código incorreto.</p>
    </v-flex>

    <v-flex column wrap xs12 align-self-center :class="{'mt-5': !code2faVerified || code2fa}">
      <v-btn class="btn-radius btn-pink" :large="true" @click="confirmCode2fa">Confirmar Código</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    space1: "",
    space2: "",
    space3: "",
		space4: "",
		code2faWatch: null
  }),
  computed: {
    code2fa() {
      return this.$store.getters["lead/code2fa"];
    },
    code2faVerified() {
      return this.$store.getters["lead/code2faVerified"];
    }
  },
  methods: {
    handleSpace($event, nextEl, previousEl) {
      if ($event.target.value) {
        if (nextEl) nextEl.focus();
      } else {
        if (previousEl) previousEl.focus();
      }
    },

    confirmCode2fa() {
      const code2fa = [this.space1, this.space2, this.space3, this.space4];
      this.$store.dispatch("lead/verifyCode2fa", code2fa.join(""));
    },

    generateCode2fa() {
      this.$store.dispatch("lead/code2fa");
    }
  },
  mounted() {
    if (this.$route.params.code2fa) this.generateCode2fa();

    this.code2faWatch = this.$store.watch(state => state.lead.code2fa, value => {
			console.log('value:: ', value)
			if (value) 
				this.$router.push({ name: 'FirstData' })
		});
	},
	beforeDestroy() {
		this.code2faWatch()
	}
};
</script>


<style scoped>
.layout {
  background-color: #ffffff;
  padding: 30px 20px;
}

.text-kovi {
  color: rgba(74, 74, 74, 0.8);
  font-size: 50px;
}

.input-code {
  border: none;
  border-bottom: 4px solid #4a4a4a;
  width: 33px;
  font-size: 50px;
  color: rgba(74, 74, 74, 0.8);
  text-align: center;
  text-transform: uppercase;
  outline: none;
}
.input-code::placeholder {
  opacity: 0.3;
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
  color: #ff3859;
  text-decoration: none;
}

.text-mensage-erro {
  font-size: 16px;
  color: red;
}

.btn-radius {
  border-radius: 22.5pt;
}

.btn-pink {
  background-color: #ff3859 !important;
  color: #ffffff;
}
</style>

