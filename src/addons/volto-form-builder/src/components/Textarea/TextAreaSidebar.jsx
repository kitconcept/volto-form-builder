import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import {
  TextWidget,
  SelectWidget,
  CheckboxWidget,
} from '@plone/volto/components';

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
  customErrorMessage: {
    id: 'Error Message',
    defaultMessage: 'Error Message',
  },
});

const TextAreaSidebar = (props) => {
  const value = props.data.label;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="TextArea" defaultMessage="TextArea" />
        </h2>
      </header>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="textarea-label"
          title={props.intl.formatMessage(messages.label)}
          required={true}
          value={value}
          onChange={(event, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              label: value,
            });
          }}
        />
      </Segment>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="textarea-placeholder"
          title={props.intl.formatMessage(messages.placeholder)}
          value={props.data.placeholder}
          onChange={(event, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              placeholder: value,
            });
          }}
        />
      </Segment>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="textarea-error-message"
          title={props.intl.formatMessage(messages.customErrorMessage)}
          value={props.data.customErrorMessage}
          onChange={(event, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              customErrorMessage: value,
            });
          }}
        />
      </Segment>
      <Segment className="form sidebar-textarea-data">
        <CheckboxWidget
          id="textarea-checkbox"
          title={props.intl.formatMessage(messages.required)}
          value={props.data.validation?.required}
          onChange={(event, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              validation: {
                required: value,
              },
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

export default injectIntl(TextAreaSidebar);
