import { css } from 'styled-components';

export default css`
  width: 100%;
  border: 1px solid #eee;
  height: 120px;
  background-color: ${props => props.backgroundColor};
  @media screen and (max-width: 1056px) {
    width: 300px;
  }
  @media screen and (min-width: 1300px) {
    width: 75% !important;
  }
`;
