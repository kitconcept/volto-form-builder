import React from 'react';
import { CheckboxWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFormbuilderInputValue } from '../../actions';

const CheckboxView = ({
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
        <CheckboxWidget
          id="external"
          title={data.checkboxText}
          value={formbuilder[path]?.[blockid] || false}
          onChange={(id, value) => {
            setFormbuilderInputValue(path, blockid, value);
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
)(CheckboxView);
