import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import FormField from 'grommet/components/FormField';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import { ConfirmLayer, CarouselSlideForm } from '../Shared';

class BlockHeroForm extends Component {
  constructor(props) {
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

    this._deleteSlide = this._deleteSlide.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._addSlideClick = this._addSlideClick.bind(this);
    this._onTabsClick = this._onTabsClick.bind(this);
    this._toggleConfirm = this._toggleConfirm.bind(this);
    this._onChangeContent = this._onChangeContent.bind(this);
  }

  componentWillMount() {
    if (!this.props.carousel) {
      this._addSlideClick();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.carousel) {
      // Copy Carousel state array.
      this.setState({
        carousel: nextProps.carousel.slice(),
      });
    }
  }

  _onTabsClick(tabIndex) {
    this.setState({ activeSlideIndex: tabIndex });
  }

  _addSlideClick() {
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.push({
      image: '',
    });

    this.setState({
      activeSlideIndex: nextCarouselState.length - 1,
      carousel: nextCarouselState,
    });
  }

  _toggleConfirm() {
    this.setState({ confirmLayer: !this.state.confirmLayer });
  }

  _deleteSlideClick() {
    this._toggleConfirm();
  }

  _deleteSlide(activeIndex, event) {
    event.preventDefault();
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.splice(activeIndex);

    this.setState({
      activeSlideIndex: 0,
      carousel: nextCarouselState,
      confirmLayer: false,
    });
  }

  _handleChange({ image, imageSize }) {
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

  _onChangeContent({ target }) {
    const key = target.id;
    if (key === 'path' || key === 'label') {
      const newState = {
        button: {
          ...this.state.button,
          [`${key}`]: target.value,
        },
      };
      this.setState(newState);
    }
    const newState = {
      [`${key}`]: target.value,
    };
    this.setState(newState);
  }

  _onSubmit({ carousel, imageSize, content, headline, button }) {
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
              value={headline} onChange={this._onChangeContent} rows="1"
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
              onChange={this._onChangeContent}
              rows="3"
            />
          </FormField>
          <FormField label="Button Label" htmlFor="label">
            <input
              id="label"
              name="label"
              type="text"
              value={button.label}
              onChange={this._onChangeContent}
            />
          </FormField>
          <FormField label="Button Path" htmlFor="path">
            <input
              id="path"
              name="path"
              type="text"
              value={button.path}
              onChange={this._onChangeContent}
            />
          </FormField>
        </fieldset>
        <CarouselSlideForm
          assetNode={assetNode}
          imageSize={imageSize}
          data={this.state.carousel[activeSlideIndex]}
          onChange={this._handleChange}
          onSubmit={this._onSubmit.bind(this, this.state)}
        />
      </Box>
    );

    const tabs = this.state.carousel.map((slide, index) =>
      <Tab
        title={`Slide ${index + 1}`}
        key={index}
        onClick={this._onTabsClick.bind(this, index)}
      />);

    const confirmLayer = (this.state.confirmLayer)
      ? (<ConfirmLayer
        name={`Slide ${activeSlideIndex + 1}`} onClose={this._toggleConfirm}
        onSubmit={this._deleteSlide.bind(this, activeSlideIndex)}
      />)
      : undefined;

    return (
      <Box direction="column" pad="medium" colorIndex="light-2">
        {confirmLayer}
        <Box direction="row">
          <Box direction="row" align="center">
            <Button icon={<AddIcon />} label="add slide" onClick={this._addSlideClick} />
            <Box pad="small" />
            <Button
              icon={<TrashIcon />} label="delete slide"
              onClick={this._deleteSlideClick.bind(this, activeSlideIndex)}
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

BlockHeroForm.propTypes = {
  onSubmit: PropTypes.func,
  assetNode: PropTypes.node,
};

export default BlockHeroForm;
