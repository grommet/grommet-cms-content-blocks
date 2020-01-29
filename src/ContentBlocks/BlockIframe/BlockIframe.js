import React, { PropTypes, Component } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';

class BlockIframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { srcUrl, image, height } = this.props;
    const path = image && image.path ? image.path : '';
    return (
      <Box
        style={{
          height,
          width: '100%',
          margin: 'auto',
        }}
        basis="full"
        pad={{ horizontal: 'large', vertical: 'small' }}
        alignSelf="center"
      >
        <iframe
          src={srcUrl}
          height="100%"
          width="100%"
          sandbox="allow-same-origin allow-scripts allow-popups"
          seamless
          style={{ border: 'none' }}
        >
          <Image full="horizontal" src={path} />
        </iframe>
      </Box>
    );
  }
}

BlockIframe.propTypes = {
  srcUrl: PropTypes.string,
  image: PropTypes.string,
  height: PropTypes.string,
};

export default BlockIframe;