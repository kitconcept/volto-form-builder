import {
  SET_FORMBUILDER_INPUT_VALUE,
  Submit_Handler_Post,
  Submit_Handler_Get,
} from "../constants";
const initialState = { list: [] };

export default function formbuilder(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FORMBUILDER_INPUT_VALUE:
      return {
        ...state,
        [action.path]: {
          ...state[action.path],
          [action.inputid]: action.value,
        },
      };
    case `${Submit_Handler_Post}_SUCCESS`:
      return {
        ...state,
      };
    case `${Submit_Handler_Get}_SUCCESS`:
      //this is only for debugging puropose
      // I will remove it when backend is fixeds
      console.log(action);
      return {
        ...state,
        list: action.result,
      };
    default:
      return state;
  }
}
