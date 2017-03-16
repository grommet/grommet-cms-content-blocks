import React, { PropTypes } from 'react';
import Image from 'grommet/components/Image';

export default function BlockImage({ content, alt, image, imageSize, fit }) {
  const imageSizeLower = imageSize && imageSize.toLowerCase();
  const full = imageSizeLower === 'full' ? 'horizontal' : false;
  return (
    <Image
      full={full}
      caption={content}
      src={image.path}
      size={imageSizeLower}
      alt={alt}
    />
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

