import React, { PropTypes } from 'react';
import Headline from 'grommet/components/Headline';
import unescape from 'unescape';

export default function BlockHeading({ content, strong, size }) {
  const strongProp = strong ? strong === 'True' : false;
  const sizeProp = size ? size.toLowerCase() : 'medium';
  const unescapedContent = unescape(content || '');
  const headlineProps = {
    size: sizeProp,
    strong: strongProp,
  };
  return (
    <Headline {...headlineProps}>
      {unescapedContent}
    </Headline>
  );
};

BlockHeading.propTypes = {
  content: PropTypes.string,
  strong: PropTypes.bool,
  size: PropTypes.string,
};
