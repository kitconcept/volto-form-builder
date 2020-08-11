import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { TextWidget, CheckboxWidget } from '@plone/volto/components';

const messages = defineMessages({
  email: {
    id: 'Email',
    defaultMessage: 'Email',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
  label: {
    id: 'Label',
    defaultMessage: 'Label',
  },
});

const SubmitSidebar = (props) => {
  const value = props.data.email;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Submit" defaultMessage="Submit" />
        </h2>
      </header>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="external"
          title={props.intl.formatMessage(messages.label)}
          required={true}
          value={props.data.submit}
          onChange={(event, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              submit: value,
            });
          }}
        />
      </Segment>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="external"
          title={props.intl.formatMessage(messages.email)}
          required={true}
          value={value}
          onChange={(event, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              email: value,
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

export default injectIntl(SubmitSidebar);
