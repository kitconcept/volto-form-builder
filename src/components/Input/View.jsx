import React from "react";
import { TextWidget } from "@plone/volto/components";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { settings } from "~/config";
import { setFormbuilderInputValue } from "../../actions";

const InputView = ({
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
      <TextWidget
        id="input-form-view"
        title={data.input?.length > 0 ? data.input : "enter input label"}
        required={data.required}
        value={formbuilder[path]?.[blockid] || ""}
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
)(InputView);
