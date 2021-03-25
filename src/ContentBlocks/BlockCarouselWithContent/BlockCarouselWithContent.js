// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';
import Footer from 'grommet/components/Footer';
import Markdown from 'grommet/components/Markdown';
import unescape from 'unescape';
import ImageWrapper from '../BlockMarquee/BlockMarquee/ImageWrapper';
import ImageBox from '../BlockMarquee/BlockMarquee/ImageBox';
import { BlockButton } from '../BlockButton';
import getAssetType from './getAssetType';

/* eslint-disable react/no-unused-prop-types */
type Slide = {
  justification: string,
  color: 'white' | 'black',
  content: ?string,
  button: {
    label: string,
    path: string,
  },
  image: {
    path: string,
  }
}
/* eslint-enable react/no-unused-prop-types */

type Props = {
  carousel: Slide[],
  imageSize?: string,
  autoplay?: boolean,
  autoplaySpeed?: number
}

// eslint-disable-next-line react/prefer-stateless-function
export default class BlockCarouselWithContent extends React.Component {

  props: Props;

  render() {
    const { carousel, imageSize, autoplay, autoplaySpeed } = this.props;
    const size = imageSize ? imageSize.toLowerCase() : 'full';
    return (
      <Carousel autoplay={autoplay} autoplaySpeed={autoplaySpeed}>
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
                    size={{ width: 'large' }}
                  >
                    <Markdown
                      content={content}
                      components={{
                        p: { props: { size: 'large', margin: 'small' } },
                      }}
                    />
                    {slide.button && slide.button.label &&
                      <Footer pad={{ vertical: 'medium' }}>
                        <BlockButton
                          buttonType="Button"
                          primary="False"
                          assetType={getAssetType(slide.button.path)}
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
