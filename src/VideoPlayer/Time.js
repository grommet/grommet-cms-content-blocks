// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import CSSClassnames from 'grommet/utils/CSSClassnames';
import { formatTime } from 'grommet/utils/FormatTime';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Time extends Component {

  render () {
    const { currentTime, duration } = this.props;

    return (
      <Box pad={{ horizontal: 'small', vertical: 'none' }}>
        <Heading tag="h3" margin="none" className={`${CLASS_ROOT}__time`}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Heading>
      </Box>
    );
  }
}

Time.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number
};
