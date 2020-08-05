import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { SubmitHandler, SubmitHandlerGet } from '../../actions/index';

const SubmitView = (props) => {
  //This is for fetching the data of the form
  // useEffect(() => {
  //   props.SubmitHandlerGet(props.path);
  // }, []);
  const values = props.formbuilder[props.path] || {};
  let isValid = true;
  const onClick = () => {
    for (let keys of Object.keys(values)) {
      isValid = isValid && values[keys].valid;
    }
    if (isValid) {
      alert(JSON.stringify(values));
    } else {
      alert('Please fill the form Properly');
    }
    // This is for submiting the data of the form
    // props.SubmitHandler(props.path, props.formbuilder[props.path]);
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
  { SubmitHandler, SubmitHandlerGet },
)(SubmitView);