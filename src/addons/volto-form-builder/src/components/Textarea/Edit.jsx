import React from "react";
import { SidebarPortal, TextareaWidget } from "@plone/volto/components";
import { Form } from "semantic-ui-react";
import TextAreaSidebar from "./TextAreaSidebar";

const TextareaEdit = (props) => {
  return (
    <>
      <Form>
        <TextareaWidget
          id="external"
          title={
            props.data.label?.length > 0
              ? props.data.label
              : "Enter the lable for textarea"
          }
          required={props.data.validation?.required}
          placeholdr={props.data.placeholder}
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
