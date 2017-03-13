import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';

export default function BlockCarousel({ carousel, imageSize }) {
  const size = imageSize ? imageSize.toLowerCase() : 'large';
  const slides = carousel.map((slide, index) =>
    <Box
      key={`slide-${index}`}
      size={{ height: size, width: size }}
      full={size === 'full' ? 'horizontal' : ''}
      style={{ backgroundPosition: '50% 50%', backgroundSize: 'contain', width: '100vw', maxWidth: '100%' }}
      texture={slide.image.path}
    />,
  );

  return (
    <Box style={{ maxWidth: '100vw', width: '100%' }}>
      <Carousel>
        {slides}
      </Carousel>
    </Box>
  );
}

BlockCarousel.propTypes = {
  carousel: PropTypes.array,
  imageSize: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string,
};
