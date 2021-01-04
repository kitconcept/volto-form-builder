import React from 'react';
import { CheckboxWidget, SidebarPortal } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import CheckboxSidebar from './CheckboxSidebar';

const CheckboxEdit = (props) => {
  return (
    <>
      <Form>
        <CheckboxWidget
          id={`checkbox-form-view-${props.data.label}`}
          title={props.data.label}
          value={false}
          onChange={() => {}}
        />
      </Form>
      <SidebarPortal selected={props.selected}>
        <CheckboxSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default CheckboxEdit;
