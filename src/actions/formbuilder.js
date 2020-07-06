import { SET_FORMBUILDER_INPUT_VALUE } from '../constants';

export default function setSlateBlockSelection(path, inputid, value) {
  return {
    type: SET_FORMBUILDER_INPUT_VALUE,
    path,
    inputid,
    value,
  };
}
