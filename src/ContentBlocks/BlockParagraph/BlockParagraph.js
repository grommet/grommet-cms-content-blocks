import React, { PropTypes } from 'react';
import Markdown from 'grommet/components/Markdown';

export default function BlockParagraph({ content }) {
  const markdownContent = content || '';
  return (
    <Markdown
      content={markdownContent}
      components={{
        p: { props: { size: 'medium', margin: 'small' } },
        h1: { props: { margin: 'none' } },
        h2: { props: { margin: 'none' } },
        h3: { props: { margin: 'none' } },
        h4: { props: { margin: 'none' } },
        h5: { props: { margin: 'none' } },
      }}
    />
  );
}

BlockParagraph.propTypes = {
  content: PropTypes.string,
};
