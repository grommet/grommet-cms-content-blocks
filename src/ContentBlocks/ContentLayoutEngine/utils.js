import type { LayoutType } from './flowTypes';

const parseBooleans = (str: string) => {
  if (str === 'true' || str === 'false') {
    return str === 'true';
  }
  return str;
};

export default (layout: LayoutType[], applyLayout: boolean, itemBlockType: string = '') => {
  if (!layout && itemBlockType === 'BlockHeading') return { full: 'horizontal' };

  return (layout && applyLayout) ? Object.assign({}, ...layout.map((item) => {
    if (item.name === 'newLine') return null;
    if (item.name && item.name.includes('pad-')) {
      const verticalValue = layout.filter(i => i.name === 'pad-vertical')[0].value;
      const horizontalValue = layout.filter(i => i.name === 'pad-horizontal')[0].value;
      const horizontal = horizontalValue || 'none';
      const vertical = verticalValue || 'none';
      const pad = {
        horizontal,
        vertical,
      };
      return {
        pad,
      };
    }
    if (itemBlockType === 'BlockHeading') {
      return { full: 'horizontal' };
    }
    return {
      [`${item.name}`]: parseBooleans(item.value),
    };
  }))
  : null;
};
