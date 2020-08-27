import React from 'react';
import '../../less/form-builder.less';
import { SidebarPortal } from '@plone/volto/components';
import TextareaSidebar from './sidebar';
const Edit = (props) => {
  return (
    <>
      <div className="input-form textarea-form">
        <textarea
          type="text"
          name="name"
          autocomplete="off"
          required
          rows={10}
          cols={10}
        />
        <label htmlFor="name" className="input-label-name">
          <span className="input-content-name">
            {props.data.label?.length > 0
              ? props.data.label
              : 'enter input label'}
          </span>
        </label>
      </div>
      <SidebarPortal selected={props.selected}>
        <TextareaSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default Edit;
