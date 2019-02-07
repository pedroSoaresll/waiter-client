import apollo from '../../services/ApolloClient'
import router from '../../routes'
import { CREATE_LEAD, CODE2FA, VERIFY_CODE2FA, COMPLETE_INFO } from '../../services/Lead';
const SESSION_STORAGE_CODE2FA = 'kovi_code2fa'
const SESSION_STORAGE_PHONE = 'kovi_phone'

export const state = {
  mobilePhone: null,
  code2fa: null,
  code2faVerified: false,
  driver: {},
  transactions: [],
  booking: {},
  plan: {},
  steps: {
    GET_PHONE: { complete: false, invalid: false },
    GET_BASIC: { complete: false, invalid: false },
    NO_HAVE_REQUISITES: { complete: false, invalid: false },
    GET_CODE_CONFIRMATION: { complete: false, invalid: false },
    SEND_SURVEY_DRIVER: { complete: false, invalid: false },
    SEND_DOCUMENTS: { complete: false, invalid: false },
    COMPLETE_INFO: { complete: false, invalid: false },
    COMPLETE_INFO_APPS: { complete: false, invalid: false },
    COMPLETE_INFO_PAYMENT: { complete: false, invalid: false },
  },
  accounts: []
}

export const getters = {
  code2fa: state => state.code2fa,
  code2faVerified: state => state.code2faVerified,
  driver: state => state.driver,
  booking: state => state.booking,
  plan: state => state.plan,
  transactions: state => state.transactions,
  steps: state => state.steps,
  accounts: state => state.accounts
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
    state.driver = {
      ...state.driver,
      ..._driver
    }
  },
  setBooking(state, _booking) {
    state.booking = _booking
  },
  setPlan(state, _plan) {
    state.plan = _plan
  },
  setTransactions(state, _transactions) {
    state.transactions = _transactions
  },
  setCode2faVerified(state, _code2faVerified) {
    state.code2faVerified = _code2faVerified
  },
  setAccounts(state, _accounts) {
    state.accounts = _accounts
  }
}

export const actions = {
  resetCode2fa({commit}) {
    commit('setCode2fa', '')
    commit('setCode2faVerified', false)
    sessionStorage.removeItem(SESSION_STORAGE_CODE2FA)
  },

  restoreActivity({ state }) {
    if (!state.driver || !sessionStorage.getItem('kovi_code2fa')) {
      if (router.currentRoute.fullPath !== '/')
        router.push({ name: 'Home' })
    } else {
      switch (state.driver.status) {
        case "PENDING_DOCS":
          router.push({ name: "FinishForm" });
          break;

        case "PENDING_BOOKING":
          router.push({
            name: "DoPayment",
            query: { booking: state.driver.booking.id }
          });
          break;

        case "WAITING_LIST":
          router.push({ name: 'NoHaveRequisites' })
          break;

        default:
          return router.push({
            name: "FirstData"
          })
      }
    }
  },

  async code2fa() {
    const phone = sessionStorage.getItem(SESSION_STORAGE_PHONE)
    if (!phone)
      return Promise.reject('Telefone não armazenado na session storage')

    return await apollo.mutate({
      mutation: CODE2FA,
      variables: {
        phone_number: sessionStorage.getItem(SESSION_STORAGE_PHONE)
      }
    })
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  },

  verifyCode2fa({ commit, dispatch }, code2fa) {

    if (!code2fa || code2fa.length < 4)
      return Promise.reject('code2fa incorreto')

    const phone_number = sessionStorage.getItem(SESSION_STORAGE_PHONE)
    if (!phone_number)
      Promise.reject('Telefone não encontrado na session storage')

    return apollo.mutate({
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
            return true
          } else {
            throw new Error('Código inválido')
          }
        } catch (e) {
          // informar ao usuário que o código esta inválido
          sessionStorage.setItem(SESSION_STORAGE_CODE2FA, '')
          commit('setCode2fa', null)
          return false
        }
      })
      .then(codeValid => {
        if (codeValid)
          dispatch('restoreActivity')
      })
      .catch(() => {
        // informar ao usuário que não foi possível validar o código
        return false
      })
  },

  createDriver({ commit }, phone_number) {
    // chamar apollo para criar usuário
    apollo.mutate({
      mutation: CREATE_LEAD,
      variables: {
        phone_number
      }
    })
      .then(result => {
        const driver = result.data
          ? result.data.createLead
          : {}

        sessionStorage.setItem(SESSION_STORAGE_PHONE, phone_number)
        commit('setDriver', driver)
        commit('setSteps', {
          GET_PHONE: { complete: true, invalid: false },
        })
      })
      .catch(e => {
        commit('setSteps', {
          GET_PHONE: { complete: false, invalid: true },
        })
      })

    // tratar retorno do apollo
    // verificar status do driver e atualizar step, caso for lead e não existir dados básicos
    // liberar tela dados básicos
    // caso contrário
    // verificar se há code2fa na session storage
    // caso sim, liberar tela onde parou
    // caso não, enviar para tela de confirmar número
  },

  async sendDocs({ state, commit }, input) {
    const updated = await updateDriver(state, commit, input)

    if (updated) {
      let complete = false
      const values = Object.values(input)
        .filter(value => !value)

      if (!values.length)
        complete = true

      commit('setSteps', {
        SEND_DOCUMENTS: { complete, invalid: false },
      })
    } else {
      commit('setSteps', {
        SEND_DOCUMENTS: { complete: false, invalid: true }
      })
    }
  },

  async sendGetBasics({ state, commit }, input) {
    const updated = await updateDriver(state, commit, input)
    if (updated) {
      let complete = false
      const values = Object.values(input)
        .filter(value => !value)

      if (!values.length)
        complete = true

      commit('setSteps', {
        GET_BASIC: { complete, invalid: false },
      })
    } else {
      commit('setSteps', {
        GET_BASIC: { complete: false, invalid: true }
      })
    }
  },

  async sendSurveyDriver({ state, commit }, input) {
    const updated = await updateDriver(state, commit, input)
    if (updated) {
      let complete = false

      const requiredFields = [
        input.survey_be_over_21,
        input.survey_has_garage,
        input.survey_low_points,
      ]
        .filter(value => !value)

      const oneOrMoreRequiredFields = [
        input.survey_app_99,
        input.survey_app_uber,
        input.survey_app_cabify,
        input.survey_app_lady_driver,
        input.survey_app_others,
      ]
        .filter(value => !!value)

      const validPreData = !requiredFields.length && oneOrMoreRequiredFields.length
      complete = validPreData

      commit('setSteps', {
        SEND_SURVEY_DRIVER: { complete, invalid: false },
      })

      if (!validPreData) {
        updateDriver(state, commit, {
          status: 'WAITING_LIST'
        })
        commit('setSteps', {
          NO_HAVE_REQUISITES: { complete: true, invalid: true }
        })
        router.push({ name: 'NoHaveRequisites' })
      }
    } else {
      commit('setSteps', {
        SEND_SURVEY_DRIVER: { complete: false, invalid: true }
      })
    }
  },

  async uploadDoc({ state }, { documentType, file }) {
    if (!documentType || !file)
      return Promise.reject('Comprovante não informado')

    let formData = new FormData()
    formData.append(documentType, file)
    formData.append('driverId', state.driver.id)

    return await fetch(`${process.env.VUE_APP_KOVI_API_URL}/docs`, {
      method: 'POST',
      body: formData
    })
      .then(result => {
        return result.json()
      })
      .then(() => Promise.resolve(true))
      .catch(() => Promise.reject('Nãofoi possível salvar a imagem desejada.'))
  }
}

const updateDriver = (state, commit, input) => {
  return apollo.mutate({
    mutation: COMPLETE_INFO,
    variables: {
      phone_number: state.driver.phone_number,
      code2fa: state.code2fa,
      ...input
    }
  })
    .then(result => {
      if (result.data.updateLead) {
        commit('setDriver', result.data.updateLead)
        return true
      } else {
        return false
      }
    })
    .catch(() => {
      return false
    })
}
