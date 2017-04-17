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
      flex-basis: 100%;
      padding-right: 0px;
      padding-bottom: 24px;
    }
  `;
};

export const Box = styled(GrommetBox)`
  padding: 0;
  margin: 0;
  padding-right: 48px;
  padding-bottom: 48px;
  ${props => responsiveBoxStyles(props)}
`;

export const Section = styled(GrommetSection)`
  & > div:empty {
    padding: 0;
    margin: 0;
  }

  &:first-child > div:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  ul {
    margin-bottom: 24px;
    padding-bottom: 0;

    li:last-child {
      p:last-child {
        margin-bottom: 0;
      }
    }
  }

  &:last-child > div:last-child,
  div > div, {
    margin-bottom: 0;
    padding-bottom: 0;
    
    p:last-child,
    div:last-child,
    h2:last-child,
    h3:last-child,
    h4:last-child,
    h5:last-child,
    ul:last-child {
      margin-bottom: 0;
      padding-bottom: 0;

      li:last-child {
        p:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .grommetux-paragraph--large {
    max-width: 640px;
  }
`;
