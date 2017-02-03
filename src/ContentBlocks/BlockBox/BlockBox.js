/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default function BlockBox(props: {
  content: ?string,
  colorIndex: ?string,
}) {
  const { content, colorIndex } = props;
  return (
    <Box
      align="center"
      justify="center"
      size={{ height: 'small' }}
      colorIndex={colorIndex || 'light-1'}
    >
      <Box pad="small">
        <Heading tag="h4" strong>
          {content || ''}
        </Heading>
      </Box>
    </Box>
  );
}