import React, { PropTypes } from 'react';
import Image from 'grommet/components/Image';
import Markdown from 'grommet/components/Markdown';
import Box from 'grommet/components/Box';
import unescape from 'unescape';

export default function BlockImage({ content, alt, image, imageSize, fit }) {
  const imageSizeLower = imageSize && imageSize.toLowerCase();
  const full = imageSizeLower === 'full' ? 'horizontal' : false;
  const unescapedContent = unescape(content || '');
  const caption = (unescapedContent && unescapedContent !== '') ? <Markdown content={content} /> : '';
  const path = image && image.path ? image.path : '';
  if (path === '') {
    return null;
  }
  return (
    <Box align="start">
      <Image
        full={full}
        src={path}
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

