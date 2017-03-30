import React from 'react';
import Box from 'grommet/components/Box';
import ImageIcon from 'grommet/components/icons/base/Image';

export default function BlockMarqueeWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box align="center" full="horizontal" pad="large" colorIndex="light-2">
        <ImageIcon style={{ stroke: '#333' }} />
      </Box>
    </Box>
  );
}
