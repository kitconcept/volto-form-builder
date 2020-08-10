import React from 'react';
import { TextWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';

const EmailEdit = (props) => {
  return (
    <>
      <Form>
        <TextWidget
          id="input-edit"
          title="Email"
          required={true}
          value=""
          onChange={() => {}}
          wrapped
        />
      </Form>
    </>
  );
};

export default EmailEdit;
