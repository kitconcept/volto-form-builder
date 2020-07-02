import { SET_FORMBUILDER_INPUT_VALUE } from '../constants';
const initialState = {};

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
    default:
      return state;
  }
}
