// @flow
import Box from 'grommet/components/Box';
import styled, { css } from 'styled-components';

export function contentStyle() {
  return css`
    max-width: 50%;
    @media screen and (max-width: 950px) {
      padding: 24px;
    }
    @media screen and (max-width: 767px) {
      max-width: 100%;
    }
  `;
}

export default styled(Box)`
  ${contentStyle()}
`;
