import styled from 'styled-components';
import Box from 'grommet/components/Box';

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
