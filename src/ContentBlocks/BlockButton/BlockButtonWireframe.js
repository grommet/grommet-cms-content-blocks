import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

export default function BlockBoxWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Button primary label="Button" onClick={e => e} />
    </Box>
  );
}
