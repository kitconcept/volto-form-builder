import React from 'react';
import IntegerSidebar from './IntegerSidebar';
import { SidebarPortal } from '@plone/volto/components';

import TextIntegerNumber from '../Widgets/TextNumber';
import { Form } from 'semantic-ui-react';

const IntegerEdit = (props) => {
  const [value, setValue] = React.useState(0);
  return (
    <>
      <Form>
        <TextIntegerNumber
          id="integer-edit"
          title={props.data.label}
          required={true}
          value={value}
          onChange={(id, value) => {
            setValue(value);
            //   return setFormbuilderInputValue(path, blockid, value)
          }}
          wrapped
        />
      </Form>
      <SidebarPortal selected={props.selected}>
        <IntegerSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default IntegerEdit;
