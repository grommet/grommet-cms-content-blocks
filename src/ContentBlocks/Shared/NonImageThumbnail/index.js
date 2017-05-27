/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import DocumentIcon from 'grommet/components/icons/base/Document';
import sizer from '../SmartImage/sizer';

type Props = {
  size: 'small' | 'medium' | 'large',
}

export default function NonImageThumbnail({
  size,
}: Props) {
  const thumbStyles = size === 'thumb'
    ? { height: 48, width: 48 }
    : {};
  return (
    <Box
      size={sizer(size)}
      colorIndex="grey-3"
      align="center"
      style={{
        backgroundSize: 'cover',
        ...thumbStyles,
      }}
      justify="center"
    >
      <DocumentIcon size={size} />
    </Box>
  );
}

