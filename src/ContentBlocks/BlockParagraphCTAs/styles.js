import React from 'react';
import styled, { css } from 'styled-components';
import Box from 'grommet/components/Box';

export const ResponsiveBox = styled(Box)`
  @media screen and (max-width: 1200px) {
    .grommetux-button__label {
      display: none;
    }
  }
`;

export const CTABox = styled(
  ({ isLastElement, children, ...rest }) => // eslint-disable-line
    <Box {...rest}>{children}</Box>,
)`
  ${props => (!props.isLastElement
    ? 'margin-bottom: 12px !important;'
    : ''
  )}
`;


export const BlockContainer = styled(Box)`
  & > h1:first-child,
  & > h2:first-child,
  & > h3:first-child,
  & > h4:first-child,
  & > h5:first-child,
  & > p:first-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export default BlockContainer;
