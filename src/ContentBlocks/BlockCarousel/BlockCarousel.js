// @flow
import React from 'react';
import Image from 'grommet/components/Image';
import Carousel from 'grommet/components/Carousel';

export type CarouselSlide = {
  image: {
    path: string, // eslint-disable-line react/no-unused-prop-types
  },
}

export type ImageSize = 'Small' | 'Medium' | 'Large' | 'XLarge' | 'XXLarge' | 'Full';

type Props = {
  carousel: CarouselSlide[],
  imageSize: 'Small' | 'medium' | 'large',
}

export default function BlockCarousel({ carousel, imageSize }: Props) {
  const size = imageSize ? imageSize.toLowerCase() : 'large';
  // TODO: refactor to use grommet sizes vs. custom css
  const slides = carousel.map(({ image }, index) => (
    <Image
      src={image.path}
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
