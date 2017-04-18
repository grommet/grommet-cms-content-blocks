// @flow
import { css } from 'styled-components';

export const imageStyles = (color: ?string, caption: ?string) => {
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
  if (caption) {
    return css`
      margin-bottom: 12px;
    `;
  }
  return imageCss;
};

export const divStyles = css`
  @media all and (-ms-high-contrast:none) {
    height: 100%;
  }
`;
