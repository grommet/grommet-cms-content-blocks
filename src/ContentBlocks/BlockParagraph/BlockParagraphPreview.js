import PropTypes from 'prop-types';
import React from 'react';
import Markdown from 'grommet/components/Markdown';

export default function BlockParagraphPreview({ content }) {
  return (
    <Markdown
      content={content}
      components={{
        p: { props: { margin: 'none' } },
      }}
    />
  );
}

BlockParagraphPreview.propTypes = {
  content: PropTypes.string,
};
