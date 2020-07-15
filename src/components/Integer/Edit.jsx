import React from "react";
// import { SidebarPortal, TextWidget } from '@plone/volto/components';
// import InputSidebar from './InputSidebar';
import TextIntegerNumber from "../Integer/Edit.jsx";
import { Form } from "semantic-ui-react";

const IntegerEdit = (props) => {
  const [value, setValue] = React.useState(0);
  return (
    <>
      <Form>
        <TextIntegerNumber
          id="integer-edit"
          title="Integer field"
          required={true}
          value={value}
          onChange={(id, value) => {
            setValue(value);
            //   return setFormbuilderInputValue(path, blockid, value)
          }}
          wrapped
        />
      </Form>
      {/* <SidebarPortal selected={props.selected}>
        <InputSidebar {...props} />
      </SidebarPortal> */}
    </>
  );
};

export default IntegerEdit;
