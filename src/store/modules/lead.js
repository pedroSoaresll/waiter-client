import apollo from '../../services/ApolloClient'
import { CREATE_LEAD } from '../../services/Lead';
const SESSION_STORAGE_CODE2FA = 'kovi_code2fs'
const SESSION_STORAGE_PHONE = 'kovi_phone'

export const state = {
  mobilePhone: null,
  code2fa: null,
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
  }
}

export const actions = {
  restoreActivity({commit}, driver = null) {
    console.log('chamou aqui restore activity')

    if (driver.status === 'LEAD') {
      // change step to GET_BASIC
    }

    else if (driver.status && !sessionStorage.getItem(SESSION_STORAGE_CODE2FA)) {
      // change step to GET_CODE_CONFIRMATION
    }
  },

  createDriver({commit, dispath}, phone_number) {
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
  }
}
