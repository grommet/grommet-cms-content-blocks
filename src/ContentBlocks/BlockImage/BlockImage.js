import React, { PropTypes } from 'react';
import Image from 'grommet/components/Image';
import Markdown from 'grommet/components/Markdown';
import Box from 'grommet/components/Box';
import unescape from 'unescape';
import colorMap from './colorMap';

export default function BlockImage({ content, alt, image, borderColor }) {
  const unescapedContent = unescape(content || '');
  const caption = (unescapedContent && unescapedContent !== '') ? <Markdown content={content} /> : '';
  const path = image && image.path ? image.path : '';
  const color = (borderColor && borderColor !== 'none') ? colorMap[borderColor] : '';
  const style = color !== '' ? {
    borderBottom: `9px solid ${color}`,
  } : {};
  if (path === '') {
    return null;
  }
  return (
    <div>
      <Image
        size="full"
        style={style}
        src={path}
        alt={alt}
      />
      {caption}
    </div>
  );
}

BlockImage.propTypes = {
  content: PropTypes.string,
  alt: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string,
  }),
  borderColor: PropTypes.oneOf([
    'none',
    'red',
    'green',
  ]),
};

