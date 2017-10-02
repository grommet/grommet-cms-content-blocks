import PropTypes from 'prop-types';
import React from 'react';
import Markdown from 'grommet/components/Markdown';
import unescape from 'unescape';
import { sizing } from './sizing';

export default function BlockParagraph({ content, align, paragraphSize }) {
  const markdownContent = unescape(content || '');
  const textSize = paragraphSize || 'medium';
  const markdownComponents = sizing(textSize, align);
  return (
    <Markdown
      content={markdownContent}
      components={markdownComponents}
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
