export const state = {
    mobilePhone: null,
    code2fa: null,
    step: null,
    driver: {},
    steps: {
        GET_PHONE: {complete: false, invalid: false},
        GET_BASIC: {complete: false, invalid: false},
        GET_CODE_CONFIRMATION: {complete: false, invalid: false},
        SEND_SURVEY_DRIVER: {complete: false, invalid: false},
        SEND_DOCUMENTS: {complete: false, invalid: false},
    }
    ,
    leadId: null,
}

export const mutations = {
    setLeadId(state, _leadId) {
        state.leadId = _leadId
    },
    setStep(state, _step) {
        state.step = _step
    },
    setDriver(state, _driver) {
        state.driver = {...state.driver, ..._driver}
    },
    setSteps(state, _steps) {
        state.steps = {...state.steps, ..._steps}
    },

    setMobilePhone(state, _mobilePhone) {
        state.mobilePhone = _mobilePhone
    },
    setCode2fa(state, _code2fa) {
        state.code2fa = _code2fa
    },
    delLead(state) {
        state.mobilePhone = null
        state.step = null
        state.driver = {}
        state.leadId = null
    },
}

export const getters = {
    leadId: state => {
        return state.leadId
    },
    mobilePhone: state => {
        return state.mobilePhone
    },
    code2fa: state => {
        return state.code2fa
    },
    step: state => {
        return state.step
    },
    steps: state => {
        return state.steps
    },
    driver: state => {
        return state.driver
    },
}
