// @flow
import React from 'react';
import Box from 'grommet/components/Box';

export default function BlockColorSwatchPreview (props: {
  color: {
    name: string,
    thumbColor: string
  }
}) {
  const { color } = props;
  return (
    <Box direction="row" pad={{ between: 'medium' }}>
      <Box
        style={{ backgroundColor: color.thumbColor }}
        size={{ height: 'xsmall', width: 'small' }}
      />
      <Box justify="center">{color.name}</Box>
    </Box>
  );
}
