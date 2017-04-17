import { css } from 'styled-components';

export default (borderColor: ?string) => {
  if (borderColor !== '') {
    return css`
      border-bottom: 9px solid ${borderColor};
    `;
  }
  return css``;
};
