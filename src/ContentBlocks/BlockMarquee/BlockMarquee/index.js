/* @flow */
import React, { Component } from 'react';
import Markdown from 'grommet/components/Markdown';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import { findDOMNode } from 'react-dom';
import type { GrommetBoxTypes$Size } from 'grommet';
import ImageBox from './ImageBox';
import WrapperBox from './WrapperBox';
import ImageWrapper from './ImageWrapper';
import ContentBox from './ContentBox';
import OverlayBox from './OverlayBox';
import calculateAnimation from './animationUtils';
import {
  selectContentClassname,
  selectAlign,
  selectImage,
  selectContent,
  selectImageSize,
} from './selectors';

export type Image = { path: string };
export type Justification = 'left' | 'right';
export type Color = 'White' | 'Black';
type CarouselItem = {
  image: {
    path: string
  },
  color: Color,
  justification: Justification
}

type Props = {
  carousel: CarouselItem[],
  imageSize: GrommetBoxTypes$Size,
  content: string,
  button: ?{
    label: string,
    path: string,
  }
}

type State = {
  scale: number,
  opacity: number,
  isMobile: boolean,
  currentSlide: ?CarouselItem
}

class BlockMarquee extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.setRandomImage = this.setRandomImage.bind(this);
    this.heroRef = null;
    this.state = {
      scale: 1,
      isMobile: window.innerWidth <= 720,
      opacity: 1,
      currentSlide: null,
    };
  }
  state: State;
  componentWillMount() {
    this.setRandomImage();
  }
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
    }
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    }
  }
  setRandomImage() {
    const { carousel, imageSize, content, button } = this.props;
    const { scale, opacity, isMobile } = this.state;
    const randomIndex = Math.floor(Math.random() * carousel.length);
    const currentSlide = carousel[randomIndex];
    this.setState({
      currentSlide,
    });
  }
  handleScroll: () => void;
  handleResize: () => void;
  setRandomImage: () => void;
  heroRef: ?HTMLElement;
  props: Props;
  handleScroll() {
    if (this.heroRef) {
      const node = findDOMNode(this.heroRef);
      if (node) {
        const state = calculateAnimation(node);
        window.requestAnimationFrame(() => {
          this.setState({
            ...state,
          });
        });
      }
    }
  }
  handleResize() {
    const isMobile = window.innerWidth <= 720;
    this.setState({
      isMobile,
    });
  }
  render() {
    const { scale, opacity, isMobile, currentSlide } = this.state;
    if (!currentSlide) return null;

    const { carousel, imageSize, content, button } = this.props;
    const { image, color, justification } = currentSlide;
    const align = selectAlign(justification);
    const size = selectImageSize(imageSize);
    const contentClassName = selectContentClassname(color, isMobile);
    const imagePath = selectImage(image);
    const textContent = selectContent(content);

    return (
      <WrapperBox size={size} id="grommet-cms-content-blocks--marquee">
        <ImageWrapper id="grommet-cms-content-blocks--marquee__image-wrapper" size={size}>
          <ImageBox
            id="grommet-cms-content-blocks--marquee__image-box"
            ref={(ref) => {
              this.heroRef = ref;
            }}
            size={size}
            style={{ transform: `scale(${scale})` }}
            scale={scale}
            justification={justification}
            texture={imagePath}
          />
        </ImageWrapper>
        <ContentBox
          id="grommet-cms-content-blocks--marquee__content-box"
          justify="center"
          pad="large"
          align={align}
          style={!isMobile && { opacity }}
        >
          <OverlayBox
            pad="large"
            justify="center"
            className={contentClassName}
          >
            <Markdown
              content={textContent}
              components={{
                p: { props: { size: 'large', margin: 'small' } },
                h1: { props: { strong: true, margin: 'small' } },
                h2: { props: { strong: true } },
              }}
            />
            <Footer pad={{ vertical: 'medium' }} className="grommetux-background-color-index--light">
              {button && button.label && button.path &&
                <Button
                  primary
                  {...button}
                />
              }
            </Footer>
          </OverlayBox>
        </ContentBox>
      </WrapperBox>
    );
  }
}

export default BlockMarquee;
