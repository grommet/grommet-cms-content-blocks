// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import styled, { css } from 'styled-components';
import calculateHeight from './heightStyles';

export function calculateWrapperStyle(size: string) {
  return css`
    position: relative;
    overflow: hidden;
    width: 100vw;
    ${calculateHeight(size)}
  `;
}

export default styled(Box)`
  ${props => calculateWrapperStyle(props.size)}
`;
