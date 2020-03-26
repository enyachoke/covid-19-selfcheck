import { SET_FORM_DATA, RESET_SET_FORM_DATA , SET_SELF_CHECK_PERC ,
    RESET_SELF_CHECK_PERC, SET_DANGER_PERC , RESET_DANGER_PERC } from '../constants/types'
export const setFormData = payload => ({
    type: SET_FORM_DATA,
    payload
})

export const resetFormData = () => ({
    type: RESET_SET_FORM_DATA
})

export const setSelfCheckPerc = payload => ({
    type: SET_SELF_CHECK_PERC,
    payload
})

export const resetSelfCheckPerc = () => ({
    type: RESET_SELF_CHECK_PERC
})

export const setDangerPerc = payload => ({
    type: SET_DANGER_PERC,
    payload
})

export const resetDangerPerc = () => ({
    type: RESET_DANGER_PERC
})