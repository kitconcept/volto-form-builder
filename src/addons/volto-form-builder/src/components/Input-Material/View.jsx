import React from 'react';
import { setFormbuilderInputValue } from '../../actions';
import { connect } from 'react-redux';
import '../../less/form-builder.less';

const View = ({
  data,
  formbuilder,
  id,
  path,
  setFormbuilderInputValue,
  block,
  ...rest
}) => {
  const blockid = id;

  const onChange = (event) => {
    setFormbuilderInputValue(path, blockid, {
      ...data,
      value: event.target.value,
    });
  };
  return (
    <>
      <div className="input-form">
        <input
          type="text"
          name="name"
          autocomplete="off"
          required
          onChange={onChange}
        />
        <label htmlFor="name" className="input-label-name">
          <span className="input-content-name">
            {data.label?.length > 0 ? data.label : 'enter input label'}
          </span>
        </label>
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
  {
    setFormbuilderInputValue,
  },
)(View);
