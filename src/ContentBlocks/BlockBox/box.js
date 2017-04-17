import styled from 'styled-components';
import Box from 'grommet/components/Box';
import styles from './styles';

export default styled(Box)`
  ${props => styles(props.borderColor || '')}
`;
