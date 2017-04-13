import React, { PropTypes } from 'react';
import Markdown from 'grommet/components/Markdown';
import unescape from 'unescape';

export default function BlockParagraph({ content, align, paragraphSize }) {
  const markdownContent = unescape(content || '');
  const textSize = paragraphSize || 'medium';
  return (
    <Markdown
      content={markdownContent}
      components={{
        p: { props: { size: textSize, margin: 'small', align } },
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
  ]),
  paragraphSize: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
};

BlockParagraph.defaultProps = {
  align: 'start',
};
