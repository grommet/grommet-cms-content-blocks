// @flow
import type { LayoutType } from './flowTypes';

const parseBooleans = (str: string) => {
  if (str === 'true' || str === 'false') {
    return str === 'true';
  };
  return str;
};

export default (layout: LayoutType[]) =>
  layout ? Object.assign({}, ...layout.map((item, i) => {
    if (item.name && item.name.includes('pad-')) {
      const vertical = layout.filter(i => i.name === 'pad-vertical')[0].value;
      const horizontal = layout.filter(i => i.name === 'pad-horizontal')[0].value;
      const pad = { horizontal, vertical };
      return {
        pad
      };
    }
    return {
      [`${item.name}`]: parseBooleans(item.value)
    };
  }))
  : null;
