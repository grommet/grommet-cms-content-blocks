import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';

export default function BlockCarousel ({ carousel, imageSize }) {
  const size = imageSize ? imageSize.toLowerCase() : 'large';
  const slides = carousel.map((slide, index) =>
    <Box
      key={`slide-${index}`}
      size={{ height: size, width: size }}
      full={size === 'full'}
      style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw' }}
      texture={slide.image.path}
    />
  );

  return (
    <Carousel>
      {slides}
    </Carousel>
  );
};

BlockCarousel.propTypes = {
  carousel: PropTypes.array,
  imageSize: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string
};
