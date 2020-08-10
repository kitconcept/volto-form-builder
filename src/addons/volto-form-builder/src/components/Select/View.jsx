import React from 'react';
import { SelectWidget } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFormbuilderInputValue } from '../../actions';

const SelectView = ({
  data,
  formbuilder,
  id,
  path,
  setFormbuilderInputValue,
  block,
  ...rest
}) => {
  const blockid = id;
  const [value, setValue] = React.useState('');
  const choices = data.choices?.split(',').reduce((acc, value) => {
    return [...acc, [`${value}`, value]];
  }, []);
  return (
    <>
      <Form>
        <SelectWidget
          id="external"
          title={data.label}
          value={value}
          choices={choices}
          onChange={(id, value) => {
            setValue(value);
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
)(SelectView);
