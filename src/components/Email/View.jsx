import React from "react";
import { TextWidget } from "@plone/volto/components";
import { Form, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { setFormbuilderInputValue } from "../../actions";

const EmailView = ({
  data,
  formbuilder,
  id,
  path,
  setFormbuilderInputValue,
  block,
  ...rest
}) => {
  const blockid = id;
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(true);
  return (
    <>
      <Form>
        <TextWidget
          id="input-edit"
          title="Email"
          required={true}
          value={email}
          onChange={(id, value) => {
            setEmail(value);
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const error = re.test(String(email).toLowerCase());
            setError(error);
            if (error) {
              setFormbuilderInputValue(path, blockid, value);
            }
          }}
          wrapped
        />
        {!error && (
          <Label basic color="red" pointing>
            "Please provide a correct email address"
          </Label>
        )}
      </Form>
    </>
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
)(EmailView);
