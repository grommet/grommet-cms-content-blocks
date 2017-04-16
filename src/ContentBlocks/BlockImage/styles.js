// @flow
import { css } from 'styled-components';

export const imageStyles = (color: ?string) => {
  const imageCss = css`
    width: 100%;
    height: auto;
  `;
  if (color !== '') {
    return css`
      border-bottom: 9px solid ${color};
      ${imageCss}
    `;
  }
  return imageCss;
};

export const divStyles = css`
  @media all and (-ms-high-contrast:none) {
    height: 100%;
  }
`;
