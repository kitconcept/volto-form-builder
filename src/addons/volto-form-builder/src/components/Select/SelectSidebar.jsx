import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import {
  TextareaWidget,
  TextWidget,
  CheckboxWidget,
} from '@plone/volto/components';

const messages = defineMessages({
  label: {
    id: 'Label',
    defaultMessage: 'Label',
  },
  choices: {
    id: 'Enter one value per line',
    defineMessages: 'Enter one value per line',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
  customErrorMessage: {
    id: 'Error Message',
    defaultMessage: 'Error Message',
  },
});

const SelectSidebar = (props) => {
  const value = props.data.label;
  const choice = props.data.choices;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Select" defaultMessage="Select" />
        </h2>
      </header>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="select-label"
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
        <TextareaWidget
          id="select-choices"
          title={props.intl.formatMessage(messages.choices)}
          required={true}
          value={choice}
          onChange={(event, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              choices: value,
            });
          }}
        />
      </Segment>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="select-error-message"
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
      <Segment className="form sidebar-image-data">
        <CheckboxWidget
          id="select-required"
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

export default injectIntl(SelectSidebar);
