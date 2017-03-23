import React, { PropTypes } from 'react';
import Image from 'grommet/components/Image';
import Markdown from 'grommet/components/Markdown';
import Box from 'grommet/components/Box';

export default function BlockImage({ content, alt, image, imageSize, fit }) {
  const imageSizeLower = imageSize && imageSize.toLowerCase();
  const full = imageSizeLower === 'full' ? 'horizontal' : false;
  const caption = content ? <Markdown content={content} /> : '';
  return (
    <Box align="center">
      <Image
        full={full}
        src={image.path}
        size={imageSizeLower}
        alt={alt}
      />
      {caption}
    </Box>
  );
}

BlockImage.propTypes = {
  content: PropTypes.string,
  imageSize: PropTypes.string,
  alt: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string,
  }),
};

