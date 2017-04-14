import React, { PropTypes } from 'react';
import Markdown from 'grommet/components/Markdown';
import unescape from 'unescape';
import colorMap from './colorMap';

export default function BlockImage({ content, alt, image, borderColor }) {
  const unescapedContent = unescape(content || '');
  const caption = (unescapedContent && unescapedContent !== '') ? <Markdown content={content} /> : '';
  const path = image && image.path ? image.path : '';
  const color = (borderColor && borderColor !== 'none') ? colorMap[borderColor] : '';
  const styles = {
    width: '100%',
    height: '100%',
  };
  const style = color !== '' ? {
    ...styles,
    borderBottom: `9px solid ${color}`,
  } : { ...styles };
  if (path === '') {
    return null;
  }
  return (
    <div style={{ height: '100%' }}>
      <img
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

