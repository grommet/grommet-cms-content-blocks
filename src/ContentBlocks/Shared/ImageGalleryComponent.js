import React, { PropTypes, Component } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import styled from 'styled-components';

const Div = styled.div`
  @media all and (-ms-high-contrast:none) {
    height: 100%;
  }
`;

const Img = styled.img`
  width: 100%;
  @media all and (-ms-high-contrast:none) {
    height: 100%;
  }
`;

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
    } = this.props;
    return (
      <Box align="center" justify="center" direction="column">
        <Div>
          <Img alt="carousel" src={images[currentIndex].path} />
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
        </Div>
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
  onClickItem: PropTypes.func.isRequired,
};
