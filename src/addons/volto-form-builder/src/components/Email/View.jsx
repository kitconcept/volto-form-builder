import React from 'react';
import { TextWidget } from '@plone/volto/components';
import { Form, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFormbuilderInputValue } from '../../actions';

const EmailView = ({
  data,
  formbuilder,
  id,
  path,
  setFormbuilderInputValue,
  block,
  ...rest
}) => {
  const blockid = id;
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(true);
  return (
    <>
      <Form>
        <TextWidget
          id="email-form-view"
          title="Email"
          required={true}
          value={email}
          error={!error ? ['Please enter valid email'] : []}
          placeholder="Enter your email"
          onChange={(id, value) => {
            setEmail(value);
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const error = re.test(String(email).toLowerCase());
            setError(error);
            setFormbuilderInputValue(path, blockid, {
              label: 'Email',
              validation: {
                required: true,
              },
              placeholder: 'Enter your email',
              customErrorMessage: 'Please enter a valid email',
              valid: error,
              touch: true,
              value,
            });
          }}
          wrapped
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
)(EmailView);
