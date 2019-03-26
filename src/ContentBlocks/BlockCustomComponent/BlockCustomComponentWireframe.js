import React from 'react';
import Box from 'grommet/components/Box';
import Cubes from 'grommet/components/icons/base/Cubes';

const BlockCustomComponentWireframe = () => (
  <Box pad={{ between: 'small' }}>
    <Box
      align="center"
      justify="center"
      full="horizontal"
      pad="large"
      colorIndex="accent-3"
    >
      <Cubes style={{ stroke: '#fff' }} />
    </Box>
  </Box>
);

export default BlockCustomComponentWireframe;
