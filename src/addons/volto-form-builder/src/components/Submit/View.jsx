import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  setFormbuilderInputValue,
  SubmitHandler,
  SubmitHandlerGet,
} from '../../actions/index';

const SubmitView = (props) => {
  //This is for fetching the data of the form
  // useEffect(() => {
  //   props.SubmitHandlerGet(props.path);
  // }, []);
  const values = props.formbuilder[props.path] || {};
  let isValid = true;
  const onClick = () => {
    for (let keys of Object.keys(values)) {
      if (values[keys].validation?.required) {
        isValid = isValid && values[keys].valid;
        if (isValid === false) {
          const data = props.formbuilder[props.path]?.[keys];
          props.setFormbuilderInputValue(props.path, keys, {
            ...data,
            touch: true,
          });
          return;
        }
      }
    }

    if (isValid) {
      let data = {};
      for (let keys of Object.keys(values)) {
        data[values[keys].label] = values[keys].value;
      }
      props.SubmitHandler(props.path, data);
    }
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
  { setFormbuilderInputValue, SubmitHandler, SubmitHandlerGet },
)(SubmitView);
