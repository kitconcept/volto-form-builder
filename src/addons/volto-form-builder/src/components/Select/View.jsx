import React, { useEffect } from 'react';
import { SelectWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFormbuilderInputValue } from '../../actions';
import checkValidity from '../../checkValidity';

const SelectView = ({
  data,
  formbuilder,
  id,
  path,
  setFormbuilderInputValue,
  block,
  ...rest
}) => {
  const blockid = id;
  const [value, setValue] = React.useState('');
  const reducerData = formbuilder[path]?.[blockid];
  const choices = data.choices?.split(',').reduce((acc, value) => {
    return [...acc, [`${value}`, value]];
  }, []);
  useEffect(() => {
    setFormbuilderInputValue(path, blockid, {
      ...data,
      valid: false,
      touch: false,
    });
  }, []);
  return (
    <>
      <Form>
        <SelectWidget
          id="select-form-view"
          title={data.label}
          value={value}
          choices={choices}
          required={data.validation?.required}
          error={
            reducerData?.touch
              ? reducerData?.valid
                ? []
                : [data.customErrorMessage]
              : []
          }
          onChange={(id, value) => {
            setValue(value);
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
    </>
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
)(SelectView);
