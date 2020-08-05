import React, { useEffect, useState } from 'react';
import { TextWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFormbuilderInputValue } from '../../actions';
import checkValidity from '../../checkValidity';

const InputView = ({
  data,
  formbuilder,
  id,
  path,
  setFormbuilderInputValue,
  block,
  ...rest
}) => {
  const blockid = id;
  useEffect(() => {
    setFormbuilderInputValue(path, blockid, {
      ...data,
      valid: false,
      touch: false,
    });
  }, []);
  const reducerData = formbuilder[path]?.[blockid];

  return (
    <Form>
      <TextWidget
        id="input-form-view"
        title={data.label?.length > 0 ? data.label : 'enter input label'}
        required={data.validation?.required}
        value={reducerData?.value || ''}
        error={reducerData?.valid ? [] : [data.customErrorMessage]}
        onChange={(id, value) => {
          let isValid;
          if (reducerData.touch && typeof value == 'undefined') {
            isValid = false;
          } else {
            isValid = checkValidity(value, reducerData?.validation);
          }
          setFormbuilderInputValue(path, blockid, {
            ...reducerData,
            value,
            touch: true,
            valid: isValid,
          });
        }}
      />
    </Form>
  );
};

export default connect(
  (state, props) => {
    return {
      formbuilder: state.formbuilder,
    };
  },
  {
    setFormbuilderInputValue,
  },
)(InputView);
