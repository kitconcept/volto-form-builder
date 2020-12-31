import React, { useEffect } from 'react';
import { TextareaWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFormbuilderInputValue } from '../../actions';
import checkValidity from '../../checkValidity';

const TextareaView = ({
  data,
  formbuilder,
  id,
  path,
  setFormbuilderInputValue,
  block,
  ...rest
}) => {
  const blockid = id;
  const reducerData = formbuilder[path]?.[blockid];
  useEffect(() => {
    setFormbuilderInputValue(path, blockid, {
      ...data,
      valid: false,
      touch: false,
    });
  }, []);

  return (
    <Form>
      <TextareaWidget
        id={`textarea-form-view-${data.label}`}
        title={data.label}
        required={data.validation?.required}
        value={reducerData?.value || ''}
        placeholder={data.placeholder}
        error={
          reducerData?.touch
            ? reducerData?.valid
              ? []
              : [data.customErrorMessage]
            : []
        }
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
)(TextareaView);
