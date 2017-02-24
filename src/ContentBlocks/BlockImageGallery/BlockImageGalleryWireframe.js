import React from 'react';
import Box from 'grommet/components/Box';
import GalleryIcon from 'grommet/components/icons/base/Gallery';

export default function BlockImageGalleryWireframe() {
  return (
    <Box pad={{ between: 'small' }} direction="column">
      <Box
        flex
        basis="3/4"
        colorIndex="light-2"
        align="center"
        justify="center"
        pad={{ horizontal: 'small', vertical: 'medium' }}
      >
        <GalleryIcon style={{ stroke: '#f5f5f5' }} />
      </Box>
      <Box
        align="center"
        justify="between"
        basis="1/4"
        responsive={false}
        direction="row"
        wrap={false}
        pad={{ between: 'small' }}
      >
        <Box
          basis="1/4"
          colorIndex="light-2"
          margin="none"
          pad="small"
        />
        <Box
          basis="1/4"
          colorIndex="light-2"
          margin="none"
          pad="small"
        />
        <Box
          basis="1/4"
          colorIndex="light-2"
          margin="none"
          pad="small"
        />
        <Box
          basis="1/4"
          colorIndex="light-2"
          margin="none"
          pad="small"
        />
      </Box>
      <Box
        align="center"
        justify="between"
        basis="1/4"
        responsive={false}
        direction="row"
        wrap={false}
        pad={{ between: 'small' }}
      >
        <Box
          basis="1/4"
          colorIndex="light-2"
          margin="none"
          pad="small"
        />
        <Box
          basis="1/4"
          colorIndex="light-2"
          margin="none"
          pad="small"
        />
        <Box
          basis="1/4"
          colorIndex="light-2"
          margin="none"
          pad="small"
        />
        <Box
          basis="1/4"
          colorIndex="light-2"
          margin="none"
          pad="small"
        />
      </Box>
    </Box>
  );
}
