// @flow
import styled from 'styled-components';
import { imageStyles } from './styles';

export default styled.img`
  ${props => imageStyles(props.color)}
`;
