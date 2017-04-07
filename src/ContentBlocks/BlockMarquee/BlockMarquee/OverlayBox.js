// @flow
import Box from 'grommet/components/Box';
import styled, { css } from 'styled-components';

export function contentStyle() {
  return css`
    max-width: 50%;
  `;
}

export default styled(Box)`
  ${contentStyle()}
`;
