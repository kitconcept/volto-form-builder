import formSVG from '@plone/volto/icons/form.svg';

import {
  InputEdit,
  InputView,
  TextareaEdit,
  TextareaView,
  SubmitEdit,
  SubmitView,
} from './components';
import { formbuilder } from './reducers';

export default function applyConfig(config) {
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

  const groupBlocksOrder = [
    ...config.blocks.groupBlocksOrder,
    { id: 'form', title: 'Form' },
  ];

  config.blocks = {
    ...config.blocks,
    groupBlocksOrder,
    blocksConfig: { ...config.blocks.blocksConfig, ...FormBlock },
  };

  config.addonReducers = {
    ...config.addonReducers,
    formbuilder,
  };

  return config;
}
