import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Carousel from 'grommet/components/Carousel';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Markdown from 'grommet/components/Markdown';

export default function BlockCarouselWithContent({ carousel, imageSize }) {
  const size = imageSize ? imageSize.toLowerCase() : 'full';
  // TODO: refactor to use grommet sizes vs. custom css
  const slides = carousel.map((slide, index) => {
    const content = slide.content || '';
    return (
      <Box className="grommet-cms-content-blocks--carousel-slide__content-box">
        <Image
          src={slide.image.path}
          alt={`Carousel slide ${index}`}
          className={`grommet-cms-content-blocks--carousel-slide__${size}`}
        />
        {slide.content &&
          <Box
            className="grommet-cms-content-blocks--carousel-slide__content"
            align="start"
            justify="center"
            margin="large"
          >
            <Box
              margin="large"
              className="grommet-cms-content-blocks--carousel-slide__inner-box"
              pad="large"
              size="large"
              colorIndex="grey-4-a"
            >
              <Markdown
                content={content}
                components={{
                  p: { props: { size: 'large', margin: 'small' } },
                }}
              />
              {slide.button && slide.button.label &&
                <Footer pad={{ vertical: 'medium' }}>
                  <Button {...slide.button} />
                </Footer>
              }
            </Box>
          </Box>
        }
      </Box>
    )
  });

  return (
    <Carousel>
      {slides}
    </Carousel>
  );
}

BlockCarouselWithContent.propTypes = {
  carousel: PropTypes.array,
  imageSize: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string,
};
