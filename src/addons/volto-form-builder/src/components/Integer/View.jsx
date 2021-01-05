import React from 'react';
import TextIntegerNumber from '../Widgets/TextNumber';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFormbuilderInputValue } from '../../actions';

const IntegerView = ({
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
        <TextIntegerNumber
          id={`integer-edit-${data.label}`}
          title={data.label}
          required={true}
          placeholder={data.placeholder}
          value={formbuilder[path]?.[blockid]?.value || ''}
          onChange={(id, value) => {
            setFormbuilderInputValue(path, blockid, { ...data, value });
          }}
          wrapped
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
)(IntegerView);
