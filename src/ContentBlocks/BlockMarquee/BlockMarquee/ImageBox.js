// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import styled, { css } from 'styled-components';
import calculateHeight from './heightStyles';

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
export default styled(({ size, ...rest }) => <Box {...rest} />)`
  ${props => calculateImageStyle(props.size)}
`;
