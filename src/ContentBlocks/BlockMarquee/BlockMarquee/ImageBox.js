// @flow
import Box from 'grommet/components/Box';
import styled, { css } from 'styled-components';
import calculateHeight from './heightStyles';
import type { Justification } from './';

function backgroundPosition(justification: Justification) {
  const position = justification === 'left' ? 'right' : 'left';
  return css`
    background-position: center ${position};
  `;
}

export function calculateImageStyle(size: string) {
  return css`
    background-size: cover;
    width: 100vw;
    background-position: center;
    will-change: transform;
    box-sizing: border-box;
    ${calculateHeight(size)}
  `;
}

// eslint-disable-next-line
export default styled(Box)`
  ${props => calculateImageStyle(props.size)}
  ${props => backgroundPosition(props.justification)}
`;
