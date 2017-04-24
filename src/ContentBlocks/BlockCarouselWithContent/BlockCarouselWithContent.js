// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Markdown from 'grommet/components/Markdown';
import unescape from 'unescape';
import ImageWrapper from '../BlockMarquee/BlockMarquee/ImageWrapper';
import ImageBox from '../BlockMarquee/BlockMarquee/ImageBox';
import { createTrackerProps } from '../Shared';

type Slide = {
  justification: string,
  color: 'white' | 'black',
  content: string,
  image: {
    path: string,
  }
}

type Props = {
  carousel: Slide[],
  imageSize: string
}

export default class BlockCarouselWithContent extends React.Component {
  render() {
    const { carousel, imageSize } = this.props
    const size = imageSize ? imageSize.toLowerCase() : 'full';
    return (
      <Carousel autoplay={false}>
        {carousel.map((slide) => {
          const content = unescape(slide.content || '');
          const contentClassName = slide.color === 'white'
            ? 'grommetux-background-color-index--dark'
            : 'grommetux-background-color-index--light';
          return (
            <Box className="grommet-cms-content-blocks--carousel-slide__content-box">
              <ImageWrapper
                id="grommet-cms-content-blocks--carousel__image-wrapper"
                size={size}
              >
                <ImageBox
                  id="grommet-cms-content-blocks--carousel__image-box"
                  size={size}
                  justification={slide.justification}
                  texture={slide.image.path}
                />
              </ImageWrapper>
              {slide.content &&
                <Box
                  className={`grommet-cms-content-blocks--carousel-slide__content ${contentClassName}`}
                  align={slide.justification === 'left' ? 'start' : 'end'}
                  justify="center"
                  margin="large"
                >
                  <Box
                    margin="large"
                    className="grommet-cms-content-blocks--carousel-slide__inner-box"
                    pad="large"
                    size="large"
                  >
                    <Markdown
                      content={content}
                      components={{
                        p: { props: { size: 'large', margin: 'small' } },
                      }}
                    />
                    {slide.button && slide.button.label &&
                      <Footer pad={{ vertical: 'medium' }}>
                        <Button
                          {...createTrackerProps({
                            track: 'true',
                            category: 'Button',
                            value: slide.button.path,
                            type: (slide.button.path && slide.button.path.includes('http')) ? 'External Reference' : 'Internal Reference',
                            label: 'Carousel',
                          })}
                          {...slide.button}
                        />
                      </Footer>
                    }
                  </Box>
                </Box>
              }
            </Box>
          );
        })}
      </Carousel>
    );
  }
}
