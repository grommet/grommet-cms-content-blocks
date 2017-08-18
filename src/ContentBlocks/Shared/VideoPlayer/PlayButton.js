/* eslint-disable */
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Intl from 'grommet/utils/Intl';
import CSSClassnames from 'grommet/utils/CSSClassnames';
import Button from 'grommet/components/Button';
import CirclePlayIcon from 'grommet/components/icons/base/CirclePlay';
import PlayIcon from 'grommet/components/icons/base/Play';
import PauseIcon from 'grommet/components/icons/base/Pause';
import RefreshIcon from 'grommet/components/icons/base/Refresh';

const CLASS_ROOT = CSSClassnames.VIDEO;
const BUTTON_CLASS = `${CLASS_ROOT}__button`;

export default class PlayButton extends Component {

  render () {
    const {
      ended, iconSize, playing, primary, togglePlay, title, path
    } = this.props;
    const { intl } = this.context;

    const PIcon = primary ? CirclePlayIcon : PlayIcon;
    const Icon = (playing ? PauseIcon : (ended ? RefreshIcon : PIcon));
    const controlIcon = (
      <Icon className={`${BUTTON_CLASS}__icon`} size={iconSize}
        colorIndex='brand' />
    );

    const a11yControlButtonMessage = (playing ?
      'Pause Video' : (ended ? 'Restart Video' :'Play Video')
    );

    const playType =  playing
      ? 'Pause'
      : (ended ? 'Restart' :'Play');

    const a11yControlButtonTitle =
      Intl.getMessage(intl, a11yControlButtonMessage);

    return (
      <Button
        data-analytics-track={playType === 'Restart' ? 'true' : 'false'}
        data-analytics-type="Replay"
        data-analytics-label={title}
        data-analytics-value={path}
        plain={true} className={BUTTON_CLASS} onClick={togglePlay}
        a11yTitle={a11yControlButtonTitle}>
        {controlIcon}
      </Button>
    );
  }
}

PlayButton.propTypes = {
  iconSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  playing: PropTypes.bool,
  primary: PropTypes.bool,
  ended: PropTypes.bool,
  togglePlay: PropTypes.func,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

PlayButton.defaultProps = {
  iconSize: 'xlarge',
  primary: true
};
