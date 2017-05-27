// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import { SmartImage } from './';

type Props = {
  image: ?{
    path: string,
    title: string
  }
}

export default function ImagePreview({
  image,
}: Props) {
  if (!image) {
    return null;
  }
  return (
    <Box direction="row" align="center" pad={{ vertical: 'small' }}>
      <SmartImage size="thumb" image={image} />
      <Label style={{ marginLeft: 6 }} margin="none">
        {image && image.title ? image.title : ''}
      </Label>
    </Box>
  );
}