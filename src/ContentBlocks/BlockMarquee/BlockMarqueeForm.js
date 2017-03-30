// @flow
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import FormField from 'grommet/components/FormField';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import { ConfirmLayer, CarouselSlideForm } from '../Shared';

type CarouselSlide = any;
type ImageSize = 'Small' | 'Medium' | 'Large' | 'XLarge' | 'XXLarge' | 'Full';
type ButtonType = {
  path: string,
  label: string,
}
type Props = {
  carousel: CarouselSlide[],
  imageSize: ImageSize,
  button: ?ButtonType,
  content: string,
  onSubmit: ?Function,
  assetNode: HTMLElement,
}

type State = {
  carousel: CarouselSlide[],
  button: ButtonType,
  confirmLayer: boolean,
  activeSlideIndex: number,
  content: string,
  imageSize: ImageSize
}

class BlockMarqueeForm extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      carousel: props.carousel || [],
      button: props.button || { path: '', label: '' },
      confirmLayer: false,
      activeSlideIndex: 0,
      imageSize: props.imageSize || 'Large',
      content: props.content || '',
    };

    const This = (this: any);
    This.deleteSlide = this.deleteSlide.bind(this);
    This.onSubmit = this.onSubmit.bind(this);
    This.handleChange = this.handleChange.bind(this);
    This.addSlideClick = this.addSlideClick.bind(this);
    This.onTabsClick = this.onTabsClick.bind(this);
    This.toggleConfirm = this.toggleConfirm.bind(this);
    This.onChangeContent = this.onChangeContent.bind(this);
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

  onTabsClick(tabIndex: number) {
    this.setState({ activeSlideIndex: tabIndex });
  }

  onChangeContent(event: SyntheticInputEvent) {
    const { target } = event;
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

  onSubmit({ carousel, imageSize, content, button }: State) {
    const dataToSubmit = {
      carousel,
      imageSize,
      content,
      button,
    };

    if (this.props.onSubmit) {
      this.props.onSubmit(dataToSubmit);
    }
  }

  deleteSlideClick() {
    this.toggleConfirm();
  }

  deleteSlide(activeIndex: number, event: Event) {
    event.preventDefault();
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.splice(activeIndex);

    this.setState({
      activeSlideIndex: 0,
      carousel: nextCarouselState,
      confirmLayer: false,
    });
  }

  handleChange({ image, imageSize }: { image: string, imageSize: ImageSize }) {
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

  toggleConfirm() {
    this.setState({ confirmLayer: !this.state.confirmLayer });
  }

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
  props: Props;

  render() {
    const { assetNode } = this.props;
    const { activeSlideIndex, imageSize, content, button } = this.state;
    const form = (
      <Box>
        <fieldset>
          <legend>
            Content
          </legend>
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
              value={button.label}
              onChange={this.onChangeContent}
            />
          </FormField>
          <FormField label="Button Path" htmlFor="path">
            <input
              id="path"
              name="path"
              type="text"
              value={button.path}
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

    const tabs = this.state.carousel.map((slide, index) =>
      <Tab
        title={`Slide ${index + 1}`}
        key={index}
        onClick={this.onTabsClick.bind(this, index)}
      />,
    );

    const confirmLayer = (this.state.confirmLayer)
      ? (
        <ConfirmLayer
          name={`Slide ${activeSlideIndex + 1}`}
          onClose={this.toggleConfirm}
          onSubmit={this.deleteSlide.bind(this, activeSlideIndex)}
        />
      )
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
          <Box>
            <Tabs
              activeIndex={activeSlideIndex} justify="start"
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

export default BlockMarqueeForm;
