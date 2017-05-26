// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Label from 'grommet/components/Label';
import missingImage from './missingImage';

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
      <Image alt="thumbnail" size="thumb" src={image && image.path ? image.path : missingImage} />
      <Label style={{ marginLeft: 6 }} margin="none">
        {image && image.title ? image.title : ''}
      </Label>
    </Box>
  );
}