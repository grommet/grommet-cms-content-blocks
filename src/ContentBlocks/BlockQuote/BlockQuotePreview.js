import React, { PropTypes } from 'react';
import BlockQuote from './BlockQuote';

export default function BlockQuotePreview({ content, source }) {
  return (
    <BlockQuote content={content} source={source} />
  );
}

BlockQuotePreview.propTypes = {
  content: PropTypes.string,
};
