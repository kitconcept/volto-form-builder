import React, { useState } from "react";
import { TextareaWidget } from "@plone/volto/components";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { setFormbuilderInputValue } from "../../actions";

const TextareaView = ({
  data,
  formbuilder,
  id,
  path,
  setFormbuilderInputValue,
  block,
  ...rest
}) => {
  const blockid = id;

  return (
    <Form>
      <TextareaWidget
        id="external"
        title={data.textarea}
        required={data.required}
        value={formbuilder[path]?.[blockid] || ""}
        placeholder="This is text area"
        onChange={(id, value) => setFormbuilderInputValue(path, blockid, value)}
      />
    </Form>
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
  }
)(TextareaView);
