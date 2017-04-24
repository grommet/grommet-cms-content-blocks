// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';
import Image from 'grommet/components/Image';
import type { CarouselSlide } from './BlockCarousel';

type Props = {
  carousel: CarouselSlide[],
}

export default function BlockCarouselPreview({ carousel }: Props) {
  const slides = carousel.map((slide, index) =>
    <Box key={`slide-${index}`} full="horizontal">
      <Image src={slide.image.path} full="horizontal" />
    </Box>,
  );

  return (
    <Box
      colorIndex="light-1"
      direction="row"
      pad={{ between: 'medium' }}
      full="horizontal"
    >
      <Carousel>
        {slides}
      </Carousel>
    </Box>
  );
}
