import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import { ConfirmLayer, CarouselSlideForm } from '../Shared';

class BlockCarouselForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carousel: props.carousel || [],
      confirmLayer: false,
      activeSlideIndex: 0,
      imageSize: props.imageSize || 'Large'
    };

    this._deleteSlide = this._deleteSlide.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._addSlideClick = this._addSlideClick.bind(this);
    this._onTabsClick = this._onTabsClick.bind(this);
    this._toggleConfirm = this._toggleConfirm.bind(this);
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
        carousel: nextProps.carousel.slice()
      });
    }
  }

  _onTabsClick(tabIndex) {
    this.setState({ activeSlideIndex: tabIndex });
  }

  _addSlideClick() {
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.push({
      image: ''
    });

    this.setState({
      activeSlideIndex: nextCarouselState.length - 1,
      carousel: nextCarouselState
    });
  }

  _toggleConfirm() {
    this.setState({ confirmLayer: !this.state.confirmLayer });
  }

  _deleteSlideClick(activeIndex) {
    this._toggleConfirm();
  }

  _deleteSlide(activeIndex, event) {
    event.preventDefault();
    const nextCarouselState = this.state.carousel.slice();
    nextCarouselState.splice(activeIndex);

    this.setState({
      activeSlideIndex: 0,
      carousel: nextCarouselState,
      confirmLayer: false
    });
  }

  _handleChange({ image, imageSize }) {
    const { carousel, activeSlideIndex } = this.state;
    if (image !== carousel[activeSlideIndex]) {
      const nextCarouselState = [
        ...carousel.slice(0, activeSlideIndex),
        {
          image
        },
        ...carousel.slice(activeSlideIndex + 1)
      ];
      this.setState({ carousel: nextCarouselState });
    }
    if (imageSize !== this.state.imageSize) {
      this.setState({
        imageSize
      });
    }
  }

  _onSubmit({ carousel, imageSize }) {
    const dataToSubmit = {
      carousel,
      imageSize
    };

    if (this.props.onSubmit) {
      this.props.onSubmit(dataToSubmit);
    }
  }

  render() {
    const { assetNode } = this.props;
    const { activeSlideIndex, imageSize } = this.state;
    const form = (
      <Box>
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
          onClick={this._onTabsClick.bind(this, index)} />);

    const confirmLayer = (this.state.confirmLayer)
      ? <ConfirmLayer name={`Slide ${activeSlideIndex + 1}`} onClose={this._toggleConfirm}
          onSubmit={this._deleteSlide.bind(this, activeSlideIndex)} />
      : undefined;

    return (
      <Box direction="column" pad="medium" colorIndex="light-2">
        {confirmLayer}
        <Box direction="row">
          <Box direction="row" align="center">
            <Button icon={<AddIcon />} label="add slide" onClick={this._addSlideClick} />
            <Box pad="small" />
            <Button icon={<TrashIcon />} label="delete slide"
              onClick={this._deleteSlideClick.bind(this, activeSlideIndex)} />
          </Box>
        </Box>
        <Box>
          <Box>
            <Tabs activeIndex={activeSlideIndex} justify="start"
              style={{marginBottom:'-1px'}}>
              {tabs}
            </Tabs>
          </Box>
        </Box>
        {form}
      </Box>
    );
  }
};

BlockCarouselForm.propTypes = {
  onSubmit: PropTypes.func,
  assetNode: PropTypes.node
};

export default BlockCarouselForm;
