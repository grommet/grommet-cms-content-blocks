/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import { BlockParagraph } from '../BlockParagraph';

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
      <Box
        style={{
          backgroundColor: color.thumbColor,
          border: '1px solid #eee',
        }}
        size={{ height: 'xsmall', width: 'small' }}
      />
      <Heading tag="h4" strong margin="none">
        {color.name}
      </Heading>
      {color.content &&
        <BlockParagraph content={color.content} />
      }
    </Box>
  );
}
