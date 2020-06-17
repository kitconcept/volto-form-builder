/**
 * Add your config changes here.
 * @module config
 * @example
 * export const settings = {
 *   ...defaultSettings,
 *   port: 4300,
 *   listBlockTypes: {
 *     ...defaultSettings.listBlockTypes,
 *     'my-list-item',
 *   }
 * }
 */

import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  blocks as defaultBlocks,
} from '@plone/volto/config';
import formSVG from '@plone/volto/icons/form.svg';

import {
  InputEdit,
  InputView,
  TextareaEdit,
  TextareaView,
  SubmitEdit,
  SubmitView,
} from 'volto-form-builder/components';

const groupBlocksOrder = [
  ...defaultBlocks.groupBlocksOrder,
  { id: 'form', title: 'Form' },
];

export const settings = {
  ...defaultSettings,
};

export const views = {
  ...defaultViews,
};

export const widgets = {
  ...defaultWidgets,
};

const FormBlock = {
  inputBlock: {
    id: 'inputBlock',
    title: 'Input',
    icon: formSVG,
    group: 'form',
    view: InputView,
    edit: InputEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  textarea: {
    id: 'textarea',
    title: 'Textarea',
    icon: formSVG,
    group: 'form',
    view: TextareaView,
    edit: TextareaEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  submit: {
    id: 'submit',
    title: 'Submit',
    icon: formSVG,
    group: 'form',
    view: SubmitView,
    edit: SubmitEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};
export const blocks = {
  ...defaultBlocks,
  groupBlocksOrder,
  blocksConfig: { ...defaultBlocks.blocksConfig, ...FormBlock },
};

export const addonRoutes = [];
export const addonReducers = {};
