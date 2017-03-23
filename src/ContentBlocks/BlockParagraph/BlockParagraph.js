import React, { PropTypes } from 'react';
import Markdown from 'grommet/components/Markdown';
import parseMarkdown from '../../utils/markdownParser';

export default function BlockParagraph({ content }) {
  const parsedContent = parseMarkdown(content);
  return (
    <Markdown
      content={parsedContent}
      components={{
        p: { props: { size: 'medium', margin: 'none' } },
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
