// @flow
import type { ImageSize } from './index';

export default (size: ImageSize) => {
  switch (size) {
    case 'thumb':
      return {
        height: 'xsmall',
        width: 'xsmall'
      };
    case 'small':
      return {
        height: { min: 'xsmall', max: 'xsmall' },
        width: { min: 'small', max: 'small' }
      };
    case 'medium':
      return {
        height: { min: 'small', max: 'small' },
        width: { min: 'medium', max: 'medium' }
      };
    case 'large':
      return {
        height: { min: 'medium', max: 'medium' },
        width: { min: 'medium', max: 'medium' }
      };
    default:
      return {
        height: { min: 'small', max: 'small' },
        width: { min: 'medium', max: 'medium' }
      };
  }
};
