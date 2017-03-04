// @flow
import React from 'react';
import Box from 'grommet/components/Box';

export default function BlockColorSwatchPreview (props: {
  color?: {
    name: string,
    thumbColor: string
  }
}): React$Element<any> {
  const { color } = props;
  const backgroundColor =  color ? color.thumbColor : '#fff';
  const colorName = color ? color.name : 'Unknown';
  return (
    <Box direction="row" pad={{ between: 'medium' }}>
      <Box
        style={{ backgroundColor }}
        size={{ height: 'xsmall', width: 'small' }}
      />
      <Box justify="center">{colorName}</Box>
    </Box>
  );
}
