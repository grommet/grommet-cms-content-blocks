import React, { PropTypes, Component } from 'react';
import ImageGalleryComponent from '../Shared/ImageGalleryComponent';

export default class BlockImageGallery extends Component {
  constructor() {
    super();
    this.handleClickingImage = this.handleClickingImage.bind(this);
    this.state = {
      currentIndex: 0
    };
  }
  handleClickingImage(index) {
    this.setState({
      currentIndex: index
    });
  }
  render() {
    const { carousel, imageSize } = this.props;
    const { currentIndex } = this.state;

    return (
      <ImageGalleryComponent
        images={carousel.map(i => i.image)}
        imageSize={imageSize}
        currentIndex={currentIndex}
        onClickItem={this.handleClickingImage}
      />
    );
  }
};

BlockImageGallery.propTypes = {
  carousel: PropTypes.array,
  imageSize: PropTypes.string
};
