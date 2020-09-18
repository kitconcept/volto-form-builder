import React from 'react';
import { DatetimeWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFormbuilderInputValue } from '../../actions';

const DateView = ({
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
    <>
      <Form>
        <DatetimeWidget
          id="Date"
          title={data.label}
          value={formbuilder[path]?.[blockid]?.value}
          onChange={(id, value) => {
            setFormbuilderInputValue(path, blockid, { ...data, value });
          }}
        />
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
  },
)(DateView);
