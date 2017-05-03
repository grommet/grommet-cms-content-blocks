// @flow
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import { ConfirmLayer, CarouselSlideForm } from '../Shared';
import type { CarouselSlide, ImageSize } from './BlockCarousel';
import type { OnChangeEvent, Asset } from '../../types';

type State = {
  carousel: CarouselSlide[],
  activeSlideIndex: number,
  confirmLayer: boolean,
  imageSize: ImageSize,
}

type Props = {
  assetNode: HTMLElement,
  carousel: CarouselSlide[],
  imageSize: ImageSize,
  onSubmit: () => void,
}

class BlockCarouselForm extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      carousel: props.carousel || [],
      confirmLayer: false,
      activeSlideIndex: 0,
      imageSize: props.imageSize || 'Large',
    };

    this.deleteSlide = this.deleteSlide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSlideClick = this.addSlideClick.bind(this);
    this.onTabsClick = this.onTabsClick.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  state: State;

  componentWillMount() {
    if (!this.props.carousel) {
      this.addSlideClick();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.carousel) {
      // Copy Carousel state array.
      this.setState({
        carousel: nextProps.carousel.slice(),
      });
    }
  }

  onTabsClick: (tabIndex: number) => void;
  onTabsClick(tabIndex: number) {
    this.setState({ activeSlideIndex: tabIndex });
  }

  onSubmit: (state: State) => void;
  onSubmit({ carousel, imageSize }: State) {
    const dataToSubmit = {
      carousel,
      imageSize,
    };

    if (this.props.onSubmit) {
      this.props.onSubmit(dataToSubmit);
    }
  }

  handleChange: (obj: { image: Asset, imageSize: ImageSize }) => void;
  handleChange({ image, imageSize }: { image: Asset, imageSize: ImageSize }) {
    const { carousel, activeSlideIndex } = this.state;
    if (image !== carousel[activeSlideIndex]) {
      const nextCarouselState = [
        ...carousel.slice(0, activeSlideIndex),
        {
          image,
        },
        ...carousel.slice(activeSlideIndex + 1),
      ];
      this.setState({ carousel: nextCarouselState });
    }
    if (imageSize !== this.state.imageSize) {
      this.setState({
        imageSize,
      });
    }
  }

  deleteSlideClick: () => void;
  deleteSlideClick() {
    this.toggleConfirm();
  }

  deleteSlide: (activeIndex: number, event: OnChangeEvent) => void;
  deleteSlide(activeIndex: number, event: OnChangeEvent) {
    event.preventDefault();
    const nextCarouselState = this.state.carousel.slice();

    nextCarouselState.splice(activeIndex, 1);

    this.setState({
      activeSlideIndex: 0,
      carousel: nextCarouselState,
      confirmLayer: false,
    });
  }

  toggleConfirm: () => void;
  toggleConfirm() {
    this.setState({ confirmLayer: !this.state.confirmLayer });
  }

  addSlideClick: () => void;
  addSlideClick() {
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.push({
      image: {
        path: '',
      },
    });

    this.setState({
      activeSlideIndex: nextCarouselState.length - 1,
      carousel: nextCarouselState,
    });
  }

  props: Props;

  render() {
    const { assetNode } = this.props;
    const { activeSlideIndex, imageSize } = this.state;
    const form = (
      <Box>
        <CarouselSlideForm
          assetNode={assetNode}
          imageSize={imageSize}
          data={this.state.carousel[activeSlideIndex]}
          onChange={this.handleChange}
          onSubmit={this.onSubmit.bind(this, this.state)}
        />
      </Box>
    );

    const tabs = this.state.carousel.map((slide, index) =>
      <Tab
        title={`Slide ${index + 1}`}
        key={index}
        onClick={this.onTabsClick.bind(this, index)}
      />,
    );

    const confirmLayer = (this.state.confirmLayer)
      ? (<ConfirmLayer
        name={`Slide ${activeSlideIndex + 1}`}
        onClose={this.toggleConfirm}
        onSubmit={this.deleteSlide.bind(this, activeSlideIndex)}
      />)
      : undefined;

    return (
      <Box direction="column" pad="medium" colorIndex="light-2">
        {confirmLayer}
        <Box direction="row">
          <Box direction="row" align="center">
            <Button icon={<AddIcon />} label="add slide" onClick={this.addSlideClick} />
            <Box pad="small" />
            <Button
              icon={<TrashIcon />}
              label="delete slide"
              onClick={this.deleteSlideClick.bind(this, activeSlideIndex)}
            />
          </Box>
        </Box>
        <Box>
          <Box>
            <Tabs
              activeIndex={activeSlideIndex}
              justify="start"
              style={{ marginBottom: '-1px' }}
            >
              {tabs}
            </Tabs>
          </Box>
        </Box>
        {form}
      </Box>
    );
  }
}

export default BlockCarouselForm;
