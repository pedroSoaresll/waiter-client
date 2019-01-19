export const state = {
    mobilePhone: null,
    code2fa: null,
    step: 1,
    driverId: null,
    email: null,
    name: null,
    cpf: null,
    work_city: null,
    survey_app_99: false,
    survey_app_uber: false,
    survey_be_over_21: false,
    survey_has_garage: false,
    survey_low_points: false,
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
    setStep(state, _step) {
        state.step = _step
    },
    setDriverId(state, _driverId) {
        state.driverId = _driverId
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
    delStep(state) {
        state.step = 1
    },
    setEmail(state, _email) {
        state.email = _email
    },
    setName(state, _name) {
        state.name = _name
    },
    setCpf(state, _cpf) {
        state.cpf = _cpf
    },
    setWorkCity(state, _work_city) {
        state.work_city = _work_city
    },
    setSurvey(state, survey) {
        state = {state, ...survey}
    },

}

export const getters = {
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
    driverId: state => {
        return state.driverId
    },
    work_city: state => {
        return state.work_city
    },
    name: state => {
        return state.name
    },
    cpf: state => {
        return state.cpf
    },
    email: state => {
        return state.email
    },
    survey_app_99: state => {
        return state.survey_app_99
    },
    survey_app_uber: state => {
        return state.survey_app_uber
    },
    survey_be_over_21: state => {
        return state.survey_be_over_21
    },
    survey_has_garage: state => {
        return state.survey_has_garage
    },
    survey_low_points: state => {
        return state.survey_low_points
    },
}
