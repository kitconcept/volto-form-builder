import React, { useState } from 'react';
import { TextWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';

const InputView = (props) => {
  const [input, setInput] = useState('');
  const onChange = (id, value) => {
    setInput(value);
    // props.onChange(props.data.input, value);
  };
  return (
    <Form>
      <TextWidget
        id="input-form-view"
        title={
          props.data.input?.length > 0 ? props.data.input : 'enter input label'
        }
        required={props.data.required}
        value={input}
        onChange={onChange}
      />
    </Form>
  );
};

export default InputView;
