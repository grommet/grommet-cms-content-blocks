import React, { PropTypes, Component } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';

export default class ImageGallery extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(i) {
    this.props.onClickItem(i);
  }
  render() {
    const {
      images,
      currentIndex,
      imageSize,
    } = this.props;
    const size = imageSize.toLowerCase();
    return (
      <Box align="center" justify="center" direction="column">
        <Box
          size={{ height: size, width: size }}
          align="center"
          justify="center"
        >
          <Image size={size} src={images[currentIndex].path} />
        </Box>
        <Tiles pad="none" flush={false}>
          {images && images.map((image, i) =>
            <Tile
              onClick={() => this.handleClick(i)} key={i}
              style={{ border: i === currentIndex ? '.2em solid #01a982' : '' }}
            >
              <Image size="thumb" src={image.path} />
            </Tile>,
          )}
        </Tiles>
      </Box>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    }),
  ),
  currentIndex: PropTypes.number.isRequired,
  imageSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  onClickItem: PropTypes.func.isRequired,
};
