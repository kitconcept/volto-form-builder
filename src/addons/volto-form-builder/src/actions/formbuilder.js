import {
  SET_FORMBUILDER_INPUT_VALUE,
  Submit_Handler_Post,
  Submit_Handler_Get,
} from '../constants';

export function setFormbuilderInputValue(path, inputid, value) {
  return {
    type: SET_FORMBUILDER_INPUT_VALUE,
    path,
    inputid,
    value,
  };
}

export const SubmitHandler = (url, data) => {
  return {
    type: Submit_Handler_Post,
    request: {
      op: 'post',
      path: `${url}/@form`,
      data,
    },
  };
};

export const SubmitHandlerGet = (url) => {
  return {
    type: Submit_Handler_Get,
    request: {
      op: 'get',
      path: `${url}/@form`,
    },
  };
};
