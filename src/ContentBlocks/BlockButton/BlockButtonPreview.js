import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';

export default function BlockButtonPreview(props) {
  return (
    <Heading tag="h3">
      {props.label}
    </Heading>
  );
}

BlockButtonPreview.propTypes = {
  label: PropTypes.string,
};
