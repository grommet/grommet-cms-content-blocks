import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Carousel from 'grommet/components/Carousel';

export default function BlockCarousel({ carousel, imageSize }) {
  const size = imageSize ? imageSize.toLowerCase() : 'large';
  // TODO: refactor to use grommet sizes vs. custom css
  const slides = carousel.map((slide, index) => (
      <Image
        src={slide.image.path}
        alt={`Carousel slide ${index}`}
        className={`grommet-cms-content-blocks--carousel-slide__${size}`}
      />
    ));

  return (
    <Carousel autoplay={false}>
      {slides}
    </Carousel>
  );
}

BlockCarousel.propTypes = {
  carousel: PropTypes.array,
  imageSize: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string,
};
