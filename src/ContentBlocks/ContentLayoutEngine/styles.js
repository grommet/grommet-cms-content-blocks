import React from 'react';
import styled, { css } from 'styled-components';
import GrommetBox from 'grommet/components/Box';
import GrommetSection from 'grommet/components/Section';

const responsiveBoxStyles = (props) => {
  if (props.hideForResponsive) {
    return css`
      @media screen and (max-width: 1056px) {
        display: none !important;
      }
    `;
  }
  return css`
    @media screen and (max-width: 1056px) {
      padding-right: 0px;
      padding-bottom: 24px;
      max-width: 100%;
      flex-basis: auto;
      width: 100%;
    }
  `;
};

// eslint-disable-next-line no-unused-vars
export const Box = styled(({ hideForResponsive, ...rest }) => <GrommetBox {...rest} />)`
  ${props => responsiveBoxStyles(props)}
`;

export const Section = styled(GrommetSection)`
  & > div:empty {
    padding: 0;
    margin: 0;
  }
`;
