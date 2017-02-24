import React from 'react';
import Box from 'grommet/components/Box';
import CycleIcon from 'grommet/components/icons/base/Cycle';

export default function BlockHeroWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box align="center" full="horizontal" pad="large" colorIndex="light-2">
        <CycleIcon style={{ stroke: '#333' }} />
      </Box>
    </Box>
  );
}
