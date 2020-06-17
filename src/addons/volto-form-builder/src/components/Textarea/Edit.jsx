import React, { useState } from 'react';
import { SidebarPortal, TextareaWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import TextAreaSidebar from './TextAreaSidebar';

const TextareaEdit = (props) => {
  const [textarea, setTextarea] = useState('Enter the lable for textarea');
  return (
    <>
      <Form>
        <TextareaWidget
          id="external"
          title={
            props.data.textarea?.length > 0 ? props.data.textarea : textarea
          }
          required={props.data.required}
          value=""
          onChange={() => {}}
        />
      </Form>

      <SidebarPortal selected={props.selected}>
        <TextAreaSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default TextareaEdit;
