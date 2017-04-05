// @flow
import type { GrommetBoxTypes$Size } from 'grommet';
import unescape from 'unescape';
import type { Justification, Image } from './index';

type SelectContentClassname = (color: string, isMobile: boolean) => string;
export const selectContentClassname: SelectContentClassname = (color, isMobile) => {
  if (color === 'white' && !isMobile) {
    return 'grommetux-background-color-index--dark';
  }
  return 'grommetux-background-color-index--light';
};

type SelectAlign = (justification: Justification) => string;
// eslint-disable-next-line
export const selectAlign: SelectAlign = justification => justification === 'left' ? 'start' : 'end';

type SelectImage = (image: ?Image) => string;
export const selectImage: SelectImage = (image) => {
  if (!image || (image && !image.path)) {
    return '';
  }
  return image.path;
};

type SelectContent = (content: ?string) => string;
export const selectContent: SelectContent = (content) => {
  if (!content) {
    return '';
  }
  return unescape(content);
};

type SelectImageSize = (imageSize: ?string) => GrommetBoxTypes$Size;
export const selectImageSize: SelectImageSize = (imageSize) => {
  if (!imageSize) {
    return 'large';
  }
  return imageSize.toLowerCase();
};
