import React, { PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';

export default function BlockAssetLink({ content, asset }) {
  return (
    <Anchor primary href={asset.path}>
      {content}
    </Anchor>
  );
};

BlockAssetLink.propTypes = {
  content: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string
  })
};

