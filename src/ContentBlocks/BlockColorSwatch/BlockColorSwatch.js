/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import ColorTypeList from './internal/ColorTypeList';

export default function BlockColorSwatch(props: {
  color?: {
    cmyk: ?string,
    crownFoil: ?string,
    hex: ?string,
    name: ?string,
    pms: ?string,
    rgb: ?string,
    thumbColor: string
  }
}) {
  const { color } = props;
  if (!color) {
    return null;
  }
  return (
    <Box>
      <Box
        style={{ backgroundColor: color.thumbColor }}
        size={{ height: 'xsmall', width: 'small' }}
      />
      <ColorTypeList
        color={color}
      />
    </Box>
  );
}

