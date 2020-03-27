import {
  SET_FORM_DATA, RESET_SET_FORM_DATA, SET_SELF_CHECK_PERC,
  RESET_SELF_CHECK_PERC, SET_DANGER_PERC, RESET_DANGER_PERC
} from '../constants/types'

const initalState = {
  formData: {},
  loading: false,
  editing: false,
  selfCheckPerc: 0,
  dangerPerc: 0,
  error: '',
}
const selfCheck = (state = [], action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        formData: action?.payload?.data,
      };
    case RESET_SET_FORM_DATA:
      return {
        ...state,
        formData: {},
      };
    case SET_SELF_CHECK_PERC:
      return {
        ...state,
        selfCheckPerc: action.payload,
      };
    case RESET_SELF_CHECK_PERC:
      return {
        ...state,
        selfCheckPerc: 0,
      };
    case SET_DANGER_PERC:
      return {
        ...state,
        dangerPerc: action.payload,
      };
    case RESET_DANGER_PERC:
      return {
        ...state,
        dangerPerc: 0,
      };
    default:
      return state
  }
}

export default selfCheck