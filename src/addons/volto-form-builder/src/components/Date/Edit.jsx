import React from 'react';
import { DatetimeWidget, SidebarPortal } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import DateSidebar from './DateSidebar';

const DateEdit = (props) => {
  return (
    <>
      <Form>
        <DatetimeWidget
          id="external"
          title={props.data.label}
          value={false}
          onChange={() => {}}
        />
      </Form>
      <SidebarPortal selected={props.selected}>
        <DateSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default DateEdit;
