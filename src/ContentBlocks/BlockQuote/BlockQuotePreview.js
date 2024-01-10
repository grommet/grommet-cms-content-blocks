import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import BlockQuote from './BlockQuote';

export default function BlockQuotePreview ({ content, source }) {
  return (
    <Box>
      <BlockQuote content={content} source={source} />
    </Box>
  );
}

BlockQuotePreview.propTypes = {
  content: PropTypes.string
};
