import React, { PropTypes } from 'react';
import Headline from 'grommet/components/Headline';

export default function BlockHeading ({ content, strong, size }) {
  const strongProp = strong ? strong === 'True' : false;
  const sizeProp = size ? size.toLowerCase() : 'medium';
  const headlineProps = {
    size: sizeProp,
    strong: strongProp,
  };
  return (
    <Headline {...headlineProps}>
      {content}
    </Headline>
  );
};

BlockHeading.propTypes = {
  content: PropTypes.string
};
