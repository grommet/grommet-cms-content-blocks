import React, { PropTypes } from 'react';
import Image from 'grommet/components/Image';

export default function BlockImage({ content, alt, image, imageSize, fit }) {
  const imageSizeLower = imageSize && imageSize.toLowerCase();
  const full = imageSizeLower === 'full' ? 'horizontal' : false;
  const fitOption = fit ? fit.toLowerCase() : 'cover';
  return (
    <Image
      full={full}
      caption={content}
      src={image.path}
      fit={fitOption}
      size={imageSizeLower}
      alt={alt}
    />
  );
}

BlockImage.propTypes = {
  content: PropTypes.string,
  imageSize: PropTypes.string,
  fit: PropTypes.string,
  alt: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string,
  }),
};

