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
          id="checkbox-form-view"
          title={data.label}
          value={formbuilder[path]?.[blockid]?.value || false}
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
)(CheckboxView);
