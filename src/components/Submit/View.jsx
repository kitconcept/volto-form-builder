import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { SubmitHandler, SubmitHandlerGet } from "../../actions/index";

const SubmitView = (props) => {
  useEffect(() => {
    props.SubmitHandlerGet(props.path);
  }, []);
  const values = props.formbuilder[props.path] || {};
  const onClick = () => {
    alert(JSON.stringify(values));
    props.SubmitHandler(props.path, props.formbuilder[props.path]);
  };
  return (
    <>
      <div>
        <Button primary className="submit-block-button view" onClick={onClick}>
          {props.data.submit}
        </Button>
      </div>
    </>
  );
};

export default connect(
  (state, props) => {
    return {
      formbuilder: state.formbuilder,
    };
  },
  { SubmitHandler, SubmitHandlerGet }
)(SubmitView);
