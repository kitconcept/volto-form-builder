import React, { useState } from 'react';
import { TextareaWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';

const TextareaView = (props) => {
  const [textarea, setTextarea] = useState('');
  const onChange = (id, value) => {
    // props.onChange(props.data.textarea, value);
    setTextarea(value);
  };
  return (
    <Form>
      <TextareaWidget
        id="external"
        title={props.data.textarea}
        required={props.data.required}
        value={textarea}
        onChange={onChange}
      />
    </Form>
  );
};

export default TextareaView;
