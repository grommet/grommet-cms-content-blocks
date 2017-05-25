// @flow
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import { ConfirmLayer, CarouselSlideForm, SlideReordering } from '../Shared';
import swapItemOrder, { getNextActiveSlide } from '../Shared/arrayUtils';

export type Asset = { path: string };
type ImageSize = 'Small' | 'Medium' | 'Large' | 'XLarge' | 'XXLarge' | 'Full';
type ButtonType = {
  path: string,
  label: string,
}

type CarouselSlide = any;

type Props = {
  carousel: CarouselSlide[],
  imageSize: ImageSize,
  button: ?ButtonType,
  content?: string,
  onSubmit: ?Function,
  assetNode: HTMLElement,
  headline?: string,
}

type State = {
  carousel: CarouselSlide[],
  button: ?ButtonType,
  confirmLayer: boolean,
  activeSlideIndex: number,
  content: string,
  headline: string,
  imageSize: ImageSize
}

class BlockHeroForm extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      carousel: props.carousel || [],
      button: props.button || { path: '', label: '' },
      confirmLayer: false,
      activeSlideIndex: 0,
      imageSize: props.imageSize || 'Large',
      content: props.content || '',
      headline: props.headline || '',
    };

    this.deleteSlide = this.deleteSlide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSlideClick = this.addSlideClick.bind(this);
    this.onTabsClick = this.onTabsClick.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onReorderTabs = this.onReorderTabs.bind(this);
    this.onAddAssets = this.onAddAssets.bind(this);
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

  onAddAssets: (assets: Asset[]) => void;
  onAddAssets(assets: Asset[]) {
    const newAssets = assets.map(image => ({ image }));
    this.setState({
      activeSlideIndex: (this.state.carousel.length - 1) + (newAssets.length),
      carousel: [
        ...this.state.carousel,
        ...newAssets,
      ],
    });
  }

  onTabsClick: (tabIndex: number) => void;
  onTabsClick(tabIndex: number) {
    this.setState({ activeSlideIndex: tabIndex });
  }

  onSubmit: (state: State) => void;
  onSubmit({ carousel, imageSize, content, headline, button }: State) {
    const dataToSubmit = {
      carousel,
      imageSize,
      content,
      headline,
      button,
    };

    if (this.props.onSubmit) {
      this.props.onSubmit(dataToSubmit);
    }
  }

  onChangeContent: (e: SyntheticInputEvent) => void;
  onChangeContent({ target }: SyntheticInputEvent) {
    const { id, value } = (target: any);
    const key = id;
    if (key === 'path' || key === 'label') {
      const newState = {
        button: {
          ...this.state.button,
          [`${key}`]: value,
        },
      };
      this.setState(newState);
    }
    const newState = {
      [`${key}`]: value,
    };
    this.setState(newState);
  }

  props: Props;

  toggleConfirm: () => void;
  toggleConfirm() {
    this.setState({ confirmLayer: !this.state.confirmLayer });
  }

  deleteSlideClick: () => void;
  deleteSlideClick() {
    this.toggleConfirm();
  }

  deleteSlide: (activeIndex: number, event: SyntheticInputEvent) => void;
  deleteSlide(activeIndex: number, event: SyntheticInputEvent) {
    event.preventDefault();
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.splice(activeIndex);

    this.setState({
      activeSlideIndex: 0,
      carousel: nextCarouselState,
      confirmLayer: false,
    });
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

  addSlideClick: () => void;
  addSlideClick() {
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.push({
      image: '',
    });

    this.setState({
      activeSlideIndex: nextCarouselState.length - 1,
      carousel: nextCarouselState,
    });
  }

  render() {
    const { assetNode } = this.props;
    const { activeSlideIndex, imageSize, content, headline, button } = this.state;
    const form = (
      <Box>
        <fieldset>
          <legend>
            Content
          </legend>
          <FormField label="Headline" htmlFor="headline">
            <textarea
              autoFocus id="headline" name="headline" type="text"
              value={headline} onChange={this.onChangeContent} rows="1"
            />
          </FormField>
          <FormField
            label="Content"
            htmlFor="content"
          >
            <textarea
              autoFocus
              id="content"
              name="content"
              type="text"
              value={content}
              onChange={this.onChangeContent}
              rows="3"
            />
          </FormField>
          <FormField label="Button Label" htmlFor="label">
            <input
              id="label"
              name="label"
              type="text"
              value={button ? button.label : ''}
              onChange={this.onChangeContent}
            />
          </FormField>
          <FormField label="Button Path" htmlFor="path">
            <input
              id="path"
              name="path"
              type="text"
              value={button ? button.path : ''}
              onChange={this.onChangeContent}
            />
          </FormField>
        </fieldset>
        <CarouselSlideForm
          assetNode={assetNode}
          imageSize={imageSize}
          data={this.state.carousel[activeSlideIndex]}
          onChange={this.handleChange}
          onSubmit={this.onSubmit.bind(this, this.state)}
        />
      </Box>
    );

    const confirmLayer = (this.state.confirmLayer)
      ? (<ConfirmLayer
        name={`Slide ${activeSlideIndex + 1}`} onClose={this.toggleConfirm}
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
              icon={<TrashIcon />} label="delete slide"
              onClick={this.deleteSlideClick.bind(this, activeSlideIndex)}
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
        {form}
      </Box>
    );
  }
}

export default BlockHeroForm;
