/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import styled from 'styled-components';
import { BlockParagraph } from '../BlockParagraph';

const Swatch = styled(Box)`
  width: 100%;
  border: 1px solid #eee;
  height: 120px;
  background-color: ${props => props.backgroundColor};
  @media screen and (max-width: 1056px) {
    width: 300px;
  }
  @media screen and (max-width: 1300px) {
    width: 75%;
  }
`;

export default function BlockColorSwatch(props: {
  color: ?{
    name: string,
    thumbColor: string,
    content: string
  }
}) {
  const { color } = props;
  if (!color) {
    return null;
  }
  return (
    <Box>
      <Swatch backgroundColor={color.thumbColor} />
      <Heading tag="h4" strong margin="none">
        {color.name}
      </Heading>
      {color.content &&
        <BlockParagraph content={color.content} />
      }
    </Box>
  );
}
