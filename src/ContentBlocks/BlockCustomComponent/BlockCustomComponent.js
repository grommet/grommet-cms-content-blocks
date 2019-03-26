import React, { PropTypes } from 'react';
import { customComponents } from './components';

const BlockCustomComponent = ({ customComponent, ...rest }) => {
  const Component = customComponents[customComponent];
  return (
    <Component customComponent={customComponent} {...rest} />
  );
};

BlockCustomComponent.propTypes = {
  customComponent: PropTypes.string.isRequired,
};

export default BlockCustomComponent;