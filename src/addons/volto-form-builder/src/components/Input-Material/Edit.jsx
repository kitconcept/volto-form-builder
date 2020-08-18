import React from 'react';
import '../../less/form-builder.less';
import { SidebarPortal } from '@plone/volto/components';
import InputSidebar from './sidebar';

const Edit = (props) => {
  return (
    <>
      <div className="input-form">
        <input type="text" name="name" autocomplete="off" required />
        <label htmlFor="name" className="input-label-name">
          <span className="input-content-name">
            {props.data.label?.length > 0
              ? props.data.label
              : 'enter input label'}
          </span>
        </label>
      </div>
      <SidebarPortal selected={props.selected}>
        <InputSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default Edit;
