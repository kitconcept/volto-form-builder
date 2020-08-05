import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { TextWidget } from '@plone/volto/components';

const messages = defineMessages({
  label: {
    id: 'Label',
    defaultMessage: 'Label',
  },
});

const CheckboxSidebar = (props) => {
  const value = props.data.label;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Checkbox" defaultMessage="Checkbox" />
        </h2>
      </header>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="external"
          title={props.intl.formatMessage(messages.label)}
          required={true}
          value={value}
          onChange={(event, value => {
            props.onChangeBlock(props.block, {
              ...props.data,
              label: value,
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

export default injectIntl(CheckboxSidebar);
