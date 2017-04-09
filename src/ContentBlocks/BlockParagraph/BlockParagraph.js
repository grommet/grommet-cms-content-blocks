import React, { PropTypes } from 'react';
import Markdown from 'grommet/components/Markdown';
import unescape from 'unescape';

export default function BlockParagraph({ content, align }) {
  const markdownContent = unescape(content || '');
  return (
    <Markdown
      content={markdownContent}
      components={{
        p: { props: { size: 'medium', margin: 'small', align } },
        h1: { props: { margin: 'none', align } },
        h2: { props: { margin: 'none', align } },
        h3: { props: { margin: 'none', align } },
        h4: { props: { margin: 'none', align } },
        h5: { props: { margin: 'none', align } },
      }}
    />
  );
}

BlockParagraph.propTypes = {
  content: PropTypes.string,
  align: PropTypes.oneOf([
    'start',
    'center',
    'end',
  ])
};

BlockParagraph.defaultProps = {
  align: 'start',
};
