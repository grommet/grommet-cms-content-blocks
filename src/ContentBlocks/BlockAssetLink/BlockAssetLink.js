import React, { PropTypes, Component } from 'react';
import Anchor from 'grommet/components/Anchor';

export default class BlockAssetLink extends Component {
  componentDidMount() {
    // eslint-disable-next-line
    console.warn('Block asset link is deprecated and will be removed from future releases of grommet-cms-content-blocks. Please use BlockButton.');
  }
  render() {
    const { content, asset } = this.props;
    return (
      <Anchor primary href={asset.path}>
        {content}
      </Anchor>
    );
  }
}

BlockAssetLink.propTypes = {
  content: PropTypes.string,
  asset: PropTypes.shape({
    path: PropTypes.string,
  }),
};
