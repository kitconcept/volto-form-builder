import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

const SubmitView = (props) => {
  const values = props.formbuilder[props.path] || {};
  const onClick = () => {
    alert(JSON.stringify(values));
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

export default connect((state, props) => {
  return {
    formbuilder: state.formbuilder,
  };
})(SubmitView);
