import apollo from '../../services/ApolloClient'
import { CREATE_LEAD, CODE2FA, VERIFY_CODE2FA, COMPLETE_INFO } from '../../services/Lead';
const SESSION_STORAGE_CODE2FA = 'kovi_code2fs'
const SESSION_STORAGE_PHONE = 'kovi_phone'

export const state = {
  mobilePhone: null,
  code2fa: null,
  code2faVerified: false,
  driver: {},
  steps: {
    GET_PHONE: { complete: false, invalid: false },
    GET_BASIC: { complete: false, invalid: false },
    GET_CODE_CONFIRMATION: { complete: false, invalid: false },
    SEND_SURVEY_DRIVER: { complete: false, invalid: false },
    SEND_DOCUMENTS: { complete: false, invalid: false },
    COMPLETE_INFO: { complete: false, invalid: false },
    COMPLETE_INFO_APPS: { complete: false, invalid: false },
    COMPLETE_INFO_PAYMENT: { complete: false, invalid: false },
  }
}

export const getters = {
  code2fa: state => state.code2fa,
  code2faVerified: state => state.code2faVerified,
  driver: state => state.driver
}

export const mutations = {
  setStep(state, _step) {
    state.step = _step
  },
  setSteps(state, _steps) {
    state.steps = { ...state.steps, ..._steps }
  },
  setCode2fa(state, _code2fa) {
    state.code2fa = _code2fa
  },
  setDriver(state, _driver) {
    state.driver = _driver
  },
  setCode2faVerified(state, _code2faVerified) {
    state.code2faVerified = _code2faVerified
  }
}

export const actions = {
  restoreActivity({ commit }, driver = null) {
    console.log('chamou aqui restore activity')

    if (driver.status === 'LEAD') {
      // change step to GET_BASIC
    }

    else if (driver.status && !sessionStorage.getItem(SESSION_STORAGE_CODE2FA)) {
      // change step to GET_CODE_CONFIRMATION
    }
  },

  code2fa({ commit }) {

    const phone = sessionStorage.getItem(SESSION_STORAGE_PHONE)
    if (!phone)
      return Promise.reject('Telefone não armazenado na session storage')

    apollo.mutate({
      mutation: CODE2FA,
      variables: {
        phone_number: sessionStorage.getItem(SESSION_STORAGE_PHONE)
      }
    })
      .then(result => {
        console.log('código 2 fatores:: ', result)
      })
      .catch(error => {
        console.error('código 2 fatores:: ', error)
      })
  },

  verifyCode2fa({ commit }, code2fa) {

    if (!code2fa || code2fa.length < 4)
      return Promise.reject('code2fa incorreto')

    const phone_number = sessionStorage.getItem(SESSION_STORAGE_PHONE)
    if (!phone_number)
      Promise.reject('Telefone não encontrado na session storage')

    apollo.mutate({
      mutation: VERIFY_CODE2FA,
      variables: {
        code2fa,
        phone_number
      }
    })
      .then(result => {
        try {
          commit('setCode2faVerified', true)

          if (result.data.verifyCode2fa) {
            sessionStorage.setItem(SESSION_STORAGE_CODE2FA, code2fa)
            commit('setCode2fa', code2fa)
          } else {
            throw new Error('Código inválido')
          }
        } catch (e) {
          // informar ao usuário que o código esta inválido
          sessionStorage.setItem(SESSION_STORAGE_CODE2FA, '')
          commit('setCode2fa', null)
        }
      })
      .catch(error => {
        // informar ao usuário que não foi possível validar o código
        console.error('error code2fa:: ', error)
      })
  },

  createDriver({ commit, dispath }, phone_number) {
    // chamar apollo para criar usuário
    apollo.mutate({
      mutation: CREATE_LEAD,
      variables: {
        phone_number
      }
    })
      .then(result => {
        console.log('result create driver:: ', result)
        const driver = result.data
          ? result.data.createLead
          : {}

        sessionStorage.setItem(SESSION_STORAGE_PHONE, phone_number)
        commit('setDriver', driver)

      })
      .catch(error => {
        console.error('error create driver:: ', error)
      })

    // tratar retorno do apollo
    // verificar status do driver e atualizar step, caso for lead e não existir dados básicos
    // liberar tela dados básicos
    // caso contrário
    // verificar se há code2fa na session storage
    // caso sim, liberar tela onde parou
    // caso não, enviar para tela de confirmar número
  },

  updateDriver({state, commit}, input) {
    console.log('update', input)
    apollo.mutate({
      mutation: COMPLETE_INFO,
      variables: {
        phone_number: state.driver.phone_number,
        code2fa: state.code2fa,
        input
      }
    })
      .then(result => {
        console.log('resultado update driver:: ', result)
      })
      .catch(error => {
        console.error('error update driver:: ', error)
      })
  }
}
