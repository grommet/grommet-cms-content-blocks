// @flow
import { css } from 'styled-components';
import sizeMap from './maps';

export function calculateWrapperHeight(size: string) {
  const unit = size === 'full'
    ? 'vh'
    : 'px';
  return css`
    height: ${sizeMap[size]}${unit};
  `;
}

export default function calculateHeight(size: string) {
  const unit = size === 'full'
    ? 'vh'
    : 'px';
  return css`
    height: ${sizeMap[size]}${unit};
    @media screen and (max-width: 720px) {
      height: ${sizeMap[size] / 2}${unit};
    }
  `;
}
