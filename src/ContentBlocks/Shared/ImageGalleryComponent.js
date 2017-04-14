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
          size={{ width: size }}
          style={{ display: 'block' }}
        >
          <Image size={size} src={images[currentIndex].path} />
          <Tiles responsive={false} pad="none" flush={false}>
            {images && images.map((image, i) =>
              <Tile
                onClick={() => this.handleClick(i)}
                key={i}
                style={{ outline: i === currentIndex ? '.2em solid #01a982' : '' }}
              >
                <Image size="thumb" src={image.path} />
              </Tile>,
            )}
          </Tiles>
        </Box>
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
  imageSize: PropTypes.oneOf(['Small', 'Medium', 'Large', 'Xlarge']),
  onClickItem: PropTypes.func.isRequired,
};
