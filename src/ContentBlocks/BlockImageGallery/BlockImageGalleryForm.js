import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import { ConfirmLayer } from '../Shared';
import ImageGallerySlideForm from './BlockImageGallerySlideForm';

class BlockImageGalleryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carousel: props.carousel || [],
      confirmLayer: false,
      activeSlideIndex: 0,
    };

    this.deleteSlide = this.deleteSlide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSlideClick = this.addSlideClick.bind(this);
    this.onTabsClick = this.onTabsClick.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  componentWillMount() {
    if (!this.props.carousel) {
      this.addSlideClick();
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

  onTabsClick(tabIndex) {
    this.setState({ activeSlideIndex: tabIndex });
  }

  toggleConfirm() {
    this.setState({ confirmLayer: !this.state.confirmLayer });
  }

  deleteSlideClick() {
    this.toggleConfirm();
  }

  deleteSlide(activeIndex, event) {
    event.preventDefault();
    const nextCarouselState = this.state.carousel.slice();

    nextCarouselState.splice(activeIndex, 1);

    this.setState({
      activeSlideIndex: 0,
      carousel: nextCarouselState,
      confirmLayer: false,
    });
  }

  handleChange({ image }) {
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
  }

  onSubmit({ carousel }) {
    const dataToSubmit = {
      carousel,
    };

    if (this.props.onSubmit) {
      this.props.onSubmit(dataToSubmit);
    }
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

  render() {
    const { assetNode } = this.props;
    const { activeSlideIndex } = this.state;
    const form = (
      <Box>
        <ImageGallerySlideForm
          assetNode={assetNode}
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
      />);

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

BlockImageGalleryForm.propTypes = {
  onSubmit: PropTypes.func,
  assetNode: PropTypes.node,
};

export default BlockImageGalleryForm;
