import React from 'react';
import { SidebarPortal, TextWidget } from '@plone/volto/components';
import InputSidebar from './InputSidebar';
import { Form } from 'semantic-ui-react';

const InputEdit = (props) => {
  return (
    <>
      <Form>
        <TextWidget
          id="input-edit"
          title={
            props.data.label?.length > 0
              ? props.data.label
              : 'enter input label'
          }
          required={props.data.validation?.required}
          value={props.data.placeholder}
          onChange={() => {}}
          wrapped
        />
      </Form>
      <SidebarPortal selected={props.selected}>
        <InputSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default InputEdit;
