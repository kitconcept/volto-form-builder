import React from 'react';
import { SelectWidget, SidebarPortal } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import SelectSidebar from './SelectSidebar';

const SelectEdit = (props) => {
  const choices = props.data.choices?.split('\n').reduce((acc, value) => {
    return [...acc, [`${value}`, value]];
  }, []);
  return (
    <>
      <Form>
        <SelectWidget
          id="external"
          title={props.data.label}
          choices={choices}
          onChange={() => {}}
        />
      </Form>
      <SidebarPortal selected={props.selected}>
        <SelectSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default SelectEdit;
