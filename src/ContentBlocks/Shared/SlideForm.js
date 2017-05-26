// @flow
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import { ConfirmLayer, SlideReordering } from './';
import swapItemOrder, { getNextActiveSlide } from './arrayUtils';

type CarouselSlide = any;

type Asset = { path: string };

type State = {
  carousel: CarouselSlide[],
  confirmLayer: boolean,
  activeSlideIndex: number,
}

type Props = {
  carousel: CarouselSlide[],
  formNode: React$Element<*>,
  assetNode: React$Element<*>,
  onSubmit: (state: any) => void,
}

class SlideForm extends Component {
  constructor(props: Props) {
    super(props);
    this.onDeleteSlide = this.onDeleteSlide.bind(this);
    this.onDeleteSlideClick = this.onDeleteSlideClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddSlideClick = this.onAddSlideClick.bind(this);
    this.onTabsClick = this.onTabsClick.bind(this);
    this.onToggleConfirm = this.onToggleConfirm.bind(this);
    this.onReorderTabs = this.onReorderTabs.bind(this);
    this.onAssetsSelect = this.onAssetsSelect.bind(this);
    this.onAssetSelect = this.onAssetSelect.bind(this);
  }

  state: State;

  componentWillMount() {
    if (!this.props.carousel) {
      this.onAddSlideClick();
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

  onAssetsSelect: (assets: Asset[]) => void;
  onAssetsSelect(assets: Asset[]) {
    const newAssets = assets.map(image => ({ image }));
    this.setState({
      activeSlideIndex: (this.state.carousel.length - 1) + (newAssets.length),
      carousel: [
        ...this.state.carousel,
        ...newAssets,
      ],
    });
  }

  onAssetSelect: (asset: Asset) => void;
  onAssetSelect(asset: Asset) {
    const { activeSlideIndex } = this.state;
    this.setState({
      carousel: [
        ...this.state.carousel.slice(0, activeSlideIndex),
        {
          image: asset,
        },
        ...this.state.carousel.slice(activeSlideIndex + 1),
      ],
    });
  }

  onSubmit: (state: State) => void;
  onSubmit(state: State) {
    if (this.props.onSubmit) {
      this.props.onSubmit(state);
    }
  }

  onReorderTabs: (direction: 'FORWARDS' | 'BACKWARDS') => void;
  onReorderTabs(direction: 'FORWARDS' | 'BACKWARDS') {
    const { carousel, activeSlideIndex } = this.state;
    const newCarousel = swapItemOrder(carousel, activeSlideIndex, direction);
    const nextActiveSlide = getNextActiveSlide(carousel, activeSlideIndex, direction);
    this.setState({
      carousel: newCarousel,
      activeSlideIndex: nextActiveSlide,
    });
  }

  onDeleteSlideClick: () => void;
  onDeleteSlideClick() {
    this.onToggleConfirm();
  }

  onDeleteSlide: (activeIndex: number, event: Event) => void;
  onDeleteSlide(activeIndex: number, event: Event) {
    event.preventDefault();
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.splice(activeIndex, 1);

    this.setState({
      activeSlideIndex: 0,
      carousel: nextCarouselState,
      confirmLayer: false,
    });
  }

  onToggleConfirm: () => void;
  onToggleConfirm() {
    this.setState({ confirmLayer: !this.state.confirmLayer });
  }

  onAddSlideClick: () => void;
  onAddSlideClick() {
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.push({
      image: '',
    });

    this.setState({
      activeSlideIndex: nextCarouselState.length - 1,
      carousel: nextCarouselState,
    });
  }

  props: Props;

  render() {
    const { formNode, assetNode } = this.props;
    const { activeSlideIndex } = this.state;
    return (
      <Box direction="column" pad="medium" colorIndex="light-2">
        {this.state.confirmLayer ?
          <ConfirmLayer
            name={`Slide ${activeSlideIndex + 1}`}
            onClose={this.onToggleConfirm}
            onSubmit={this.onDeleteSlide.bind(this, activeSlideIndex)}
          />
        :
          null
        }
        <Box direction="row">
          <Box direction="row" align="center">
            <Button icon={<AddIcon />} label="add slide" onClick={this.onAddSlideClick} />
            <Box pad="small" />
            <Button
              icon={<TrashIcon />} label="delete slide"
              onClick={this.onDeleteSlideClick.bind(this, activeSlideIndex)}
            />
          </Box>
        </Box>
        <Box>
          <SlideReordering
            activeSlideIndex={activeSlideIndex}
            carousel={this.state.carousel}
            onTabsClick={this.onTabsClick}
            onReorder={this.onReorderTabs}
          />
        </Box>
        <Form>
          {formNode}
          {assetNode && React.cloneElement(
            assetNode,
            {
              onAssetSelect: this.onAssetSelect,
              onAssetsSelect: this.onAssetsSelect,
            },
          )}
          <Button label="submit" primary onClick={this.onSubmit} />
        </Form>
      </Box>
    );
  }
}

export default SlideForm;
