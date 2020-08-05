import React from "react";
import { Segment } from "semantic-ui-react";
import { FormattedMessage, injectIntl, defineMessages } from "react-intl";
import { TextareaWidget, TextWidget } from "@plone/volto/components";

const messages = defineMessages({
  label: {
    id: "Label",
    defaultMessage: "Label",
  },
  choices: {
    id: "Choices",
    defineMessages: "Choices",
  },
});

const SelectSidebar = (props) => {
  const value = props.data.label;
  const choice = props.data.choices;
  console.log(value, choice);
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Select" defaultMessage="Select" />
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
              label: v,
            });
          }}
        />
      </Segment>
      <Segment className="form sidebar-image-data">
        <TextareaWidget
          id="external"
          title={props.intl.formatMessage(messages.choices)}
          required={true}
          value={choice}
          onChange={(e, v) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              choices: v,
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

export default injectIntl(SelectSidebar);
