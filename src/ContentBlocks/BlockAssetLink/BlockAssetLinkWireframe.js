import React from 'react';
import Box from 'grommet/components/Box';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

export default function BlockAssetLinkWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box pad="medium" colorIndex="accent-3">
        <LinkNextIcon style={{ stroke: '#f5f5f5' }} />
      </Box>
    </Box>
  );
}
