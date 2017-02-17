// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';

export default function GenericPreview(props: {
  content: string,
  image?: {
    path: string
  }
}) {
  const { content, image } = props;
  return (
    <Box
      colorIndex="light-1"
      direction="row"
      pad={{ between: 'medium' }}
      full="horizontal"
    >
      {image && image.path &&
        <Image size="thumb" src={image.path} />
      }
      <Heading tag="h3">
        {content.slice(0, 50)}
      </Heading>
    </Box>
  );
};

GenericPreview.defaultProps = {
  content: ''
};
