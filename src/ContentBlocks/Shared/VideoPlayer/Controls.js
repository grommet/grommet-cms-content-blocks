// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import VolumeIcon from 'grommet/components/icons/base/Volume';
import VolumeMuteIcon from 'grommet/components/icons/base/VolumeMute';
import CSSClassnames from 'grommet/utils/CSSClassnames';
import Intl from 'grommet/utils/Intl';
import { formatTime } from 'grommet/utils/FormatTime';
import VideoTime from './Time';
import VideoFullscreenButton from './FullscreenButton';
import VideoProgressBar from './ProgressBar';
import VideoPlayButton from './PlayButton';

const CLASS_ROOT = CSSClassnames.VIDEO;
const BUTTON_CLASS = `${CLASS_ROOT}__button`;

export default class Controls extends Component {

  constructor () {
    super();

    this._onChapterTickHover = this._onChapterTickHover.bind(this);

    this.state = {
      activeChapterIndex: undefined
    };
  }

  _onChapterTickHover (index) {
    this.setState({activeChapterIndex: index});
  }

  _renderTitle () {
    let title;
    if (this.props.title) {
      title = (
        <Box pad={{ horizontal: 'small', vertical: 'none' }}>
          <Heading tag="h3" margin="none">{this.props.title}</Heading>
        </Box>
      );
    }

    return title;
  }

  _renderMuteButton () {
    const { muted, toggleMute } = this.props;
    const { intl } = this.context;
    const buttonMessage = (!muted)
      ? Intl.getMessage(intl, 'Mute')
      : Intl.getMessage(intl, 'Unmute');
    const Icon = (!muted)
      ? VolumeIcon
      : VolumeMuteIcon;

    return (
      <Button plain={true} onClick={toggleMute} className={BUTTON_CLASS}
        a11yTitle={buttonMessage}>
        <Icon className={`${BUTTON_CLASS}__icon`} colorIndex='brand' />
      </Button>
    );
  }

  _renderChapterLabels () {
    const { duration, timeline, ...props } = this.props;
    const { activeChapterIndex } = this.state;

    if (timeline) {
      let chapterLabels = timeline.map((chapter, index, chapters) => {
        let percent = (chapter.time / duration) * 100;
        let classes = classnames(
          `${CLASS_ROOT}__chapter-label`,
          {
            [`${CLASS_ROOT}__chapter-label-start`]: percent === 0,
            [`${CLASS_ROOT}__chapter-label-active`]:
              activeChapterIndex === index
          }
        );

        return (
          <div className={classes} key={chapter.label}
            style={{left: `${percent}%`}}>
            <span>{chapter.label}</span>
            <span>{formatTime(chapter.time)}</span>
          </div>
        );
      });

      return (
        <Box {...props} pad="none" className={`${CLASS_ROOT}__chapter-labels`}
          direction="row">
          {chapterLabels}
        </Box>
      );
    }
  }

  render() {
    const {
      togglePlay,
      hasPlayed,
      playing,
      ended,
      currentTime,
      duration,
      percentagePlayed,
      seek,
      timeline,
      allowFullScreen,
      fullscreen,
      percentageBuffered
    } = this.props;

    if (!hasPlayed) {
      return null;
    }

    let overlayContent = (
      <Box pad="none" className={`${CLASS_ROOT}__controls`}
        direction="column" justify="start">
        <VideoProgressBar
          progress={percentagePlayed}
          onChapterHover={this._onChapterTickHover}
          duration={duration}
          onChange={seek}
          timeline={timeline}
          percentageBuffered={percentageBuffered}
        />
        {timeline ? this._renderChapterLabels() : undefined}
        <Box pad="none" className={`${CLASS_ROOT}__controls-primary`}
          direction="row" justify="between">
          <Box direction="row" align="center"
            pad={{ horizontal: 'small', vertical: 'none'}}>
            <VideoPlayButton playing={playing} ended={ended} iconSize='medium'
              togglePlay={togglePlay} primary={false} />
            {this._renderTitle()}
          </Box>
          <Box direction="row" align="center"
            pad={{ horizontal: 'small', vertical: 'none', between: 'small' }}>
            <VideoTime currentTime={currentTime} duration={duration} />
            {this._renderMuteButton()}
            {allowFullScreen ?
              <VideoFullscreenButton onClick={fullscreen} /> : undefined}
          </Box>
        </Box>
      </Box>
    );

    return overlayContent;
  }
}

Controls.contextTypes = {
  intl: PropTypes.object
};