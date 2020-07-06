import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { TextWidget, CheckboxWidget } from '@plone/volto/components';

const messages = defineMessages({
  label: {
    id: 'Label',
    defaultMessage: 'Label',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
  placeholder: {
    id: 'Placeholder',
    defaultMessage: 'Placeholder',
  },
});

const InputSidebar = (props) => {
  const value = props.data.input;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Input" defaultMessage="Input" />
        </h2>
      </header>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="external"
          title={props.intl.formatMessage(messages.label)}
          required={true}
          value={value}
          onChange={(e, v) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              input: v,
            });
          }}
        />
      </Segment>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="external"
          title={props.intl.formatMessage(messages.placeholder)}
          value={props.data.placeholder}
          onChange={(e, v) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              placeholder: v,
            });
          }}
        />
      </Segment>
      <Segment className="form sidebar-image-data">
        <CheckboxWidget
          id="external"
          title={props.intl.formatMessage(messages.required)}
          value={props.data.required}
          onChange={(e, v) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              required: v,
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

export default injectIntl(InputSidebar);
