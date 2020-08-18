import React from 'react';
import { Button } from 'semantic-ui-react';
import { SidebarPortal } from '@plone/volto/components';
import SubmitSidebar from './SubmitSidebar';
import '../../less/form-builder.less';

const SubmitEdit = (props) => {
  return (
    <>
      <div>
        <Button className="submit-block-button" primary color="pink">
          {props.data.submit}
        </Button>
      </div>
      <SidebarPortal selected={props.selected}>
        <SubmitSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default SubmitEdit;
