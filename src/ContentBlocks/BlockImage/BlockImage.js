import React, { PropTypes } from 'react';
import unescape from 'unescape';
import BlockParagraph from '../BlockParagraph';
import colorMap from './colorMap';
import Div from './div';
import Image from './image';

export default function BlockImage({ content, alt, image, borderColor }) {
  const unescapedContent = unescape(content || '');
  const caption = (unescapedContent && unescapedContent !== '')
    ? <BlockParagraph content={content} />
    : '';
  const path = image && image.path ? image.path : '';
  const color = (borderColor && borderColor !== 'none') ? colorMap[borderColor] : '';
  if (path === '') {
    return null;
  }
  return (
    <Div>
      <Image
        color={color}
        src={path}
        alt={alt}
      />
      {caption}
    </Div>
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

