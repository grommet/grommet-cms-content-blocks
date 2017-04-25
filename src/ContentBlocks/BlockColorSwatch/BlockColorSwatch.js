/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import { BlockParagraph } from '../BlockParagraph';
import Swatch from './swatch';

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
      <Heading
        tag="h4"
        strong
        margin="none"
        style={{ paddingTop: '12px' }}
      >
        {color.name}
      </Heading>
      {color.content &&
        <BlockParagraph content={color.content} />
      }
    </Box>
  );
}
