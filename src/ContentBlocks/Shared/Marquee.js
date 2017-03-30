// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';
import Card from 'grommet/components/Card';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';
import CirclePlayIcon from 'grommet/components/icons/base/CirclePlay';
import CloseIcon from 'grommet/components/icons/base/Close';

const CLASS_ROOT = 'marquee';
const LIGHT_COLORINDEX = 'light-1';
const DARK_COLORINDEX = 'grey-1';
const PALM_BREAKPOINT = 720;

export default class Marquee extends Component {
  constructor(props) {
    super(props);
    this._setReverse = this._setReverse.bind(this);
    this._setTextPad = this._setTextPad.bind(this);
    this._setBackgroundColorIndex = this._setBackgroundColorIndex.bind(this);
    this._onShowVideo = this._onShowVideo.bind(this);
    this._onClose = this._onClose.bind(this);

    this.state = {
      colorIndex: props.darkTheme ? DARK_COLORINDEX : LIGHT_COLORINDEX,
      reverse: (props.justify === 'start'),
      showVideo: false,
      textPad: { horizontal: 'none', vertical: 'none', between: 'medium' },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._setReverse);
    window.addEventListener('resize', this._setTextPad);
    window.addEventListener('resize', this._setBackgroundColorIndex);
    this._setReverse();
    this._setTextPad();
    this._setBackgroundColorIndex();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._setReverse);
    window.removeEventListener('resize', this._setTextPad);
    window.removeEventListener('resize', this._setBackgroundColorIndex);
  }

  _setBackgroundColorIndex() {
    const { darkTheme } = this.props;

    if (window.innerWidth < PALM_BREAKPOINT) {
      this.setState({ colorIndex: LIGHT_COLORINDEX });
    } else {
      this.setState({ colorIndex: darkTheme ?
        DARK_COLORINDEX :
        LIGHT_COLORINDEX });
    }
  }

  _setReverse() {
    const { justify } = this.props;

    if (window.innerWidth < PALM_BREAKPOINT) {
      this.setState({ reverse: false });
    } else {
      this.setState({ reverse: (justify === 'start') });
    }
  }

  _setTextPad() {
    const { textBackgroundColorIndex } = this.props;

    if (window.innerWidth < PALM_BREAKPOINT) {
      this.setState({ textPad: textBackgroundColorIndex ?
        { horizontal: 'none', vertical: 'none', between: 'medium' } :
        { horizontal: 'large', vertical: 'large', between: 'medium' } });
    } else {
      this.setState({
        textPad: { horizontal: 'large', vertical: 'large', between: 'medium' },
      });
    }
  }

  _onShowVideo() {
    const { overlayVideo } = this.props;

    if (overlayVideo) {
      this.setState({ showVideo: true });
    }
  }

  _onClose() {
    this.setState({ showVideo: false });
  }

  _renderBackground() {
    const { backgroundImage, backgroundVideo, flush } = this.props;

    const full = flush ? 'horizontal' : false;
    const pad = flush ? 'none' : 'large';

    const backgroundVideoClasses =
      `${CLASS_ROOT}__background ${CLASS_ROOT}__background-video`;

    if (backgroundImage) {
      return (
        <Box
          containerClassName={`${CLASS_ROOT}__background`}
          appCentered pad={pad}
          style={{ backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat' }} full={full}
        />
      );
    } else if (backgroundVideo) {
      return (
        <Box className={backgroundVideoClasses} ref="video">
          {backgroundVideo}
        </Box>
      );
    }
    return undefined;
  }

  _renderImage() {
    const { image } = this.props;

    if (image) {
      return <Image src={`url(${image})`} />;
    }
    return <Box />;
  }

  _renderLogo() {
    const { logo } = this.props;

    if (logo) {
      return (
        <Box>
          <Image className={`${CLASS_ROOT}__logo`} src={logo} />
          <Box pad="small" />
        </Box>
      );
    }
    return undefined;
  }

  _renderCta() {
    const { link, linkIcon, onClick, overlayVideo } = this.props;

    let anchor;
    let watchNow;
    let separator;
    if (link || onClick) {
      anchor = (
        <Anchor
          primary target="_blank" href={link} onClick={onClick}
          label={this._linkCopy()}
        />
      );
      if (linkIcon) {
        anchor = (
          <Anchor
            target="_blank" href={link} onClick={onClick} icon={linkIcon}
            label={this._linkCopy()}
          />
        );
      }
    }

    if (overlayVideo) {
      watchNow = (
        <Anchor onClick={this._onShowVideo} icon={<CirclePlayIcon />} label="Watch Now" />
      );
    }

    if ((link || onClick) && overlayVideo) {
      separator = (
        <Box direction="row" responsive={false}>
          <Box pad={{ horizontal: 'small' }} separator="right" />
          <Box pad={{ horizontal: 'small' }} />
        </Box>
      );
    }

    if (link || onClick || overlayVideo) {
      return (
        <Box
          direction="row" responsive={false}
          pad={{ horizontal: 'none', vertical: 'small' }}
        >
          {watchNow}
          {separator}
          {anchor}
        </Box>
      );
    }
    return null;
  }

  _linkCopy() {
    const { linkText } = this.props;

    if (!linkText) {
      return 'Learn More';
    }
    return linkText;
  }

  _renderStack() {
    const { headline, label, link, onClick, overlayVideo, stackSize,
      subHeadline, textBackgroundColorIndex } = this.props;

    const logoMarkup = this._renderLogo();

    const classes = classnames(
      {
        [`${CLASS_ROOT}__stack--${stackSize}`]: stackSize,
      },
    );

    let textPad = 'none';
    let transparentTextBackgroundColorIndex;
    if (textBackgroundColorIndex) {
      textPad = 'large';
      transparentTextBackgroundColorIndex = `${textBackgroundColorIndex}-a`;
    }

    if (link || onClick || overlayVideo) {
      if (overlayVideo) {
        return (
          <Box className={classes} pad={this.state.textPad}>
            <Box
              pad={textPad}
              colorIndex={transparentTextBackgroundColorIndex}
            >
              {logoMarkup}
              <Card
                size="full" contentPad="none" colorIndex=""
                textSize={stackSize} heading={
                  <Headline strong margin="none">{headline}</Headline>
                }
                description={(typeof subHeadline === 'string') ?
                  <Paragraph margin="medium" size={stackSize}>
                    {subHeadline}
                  </Paragraph> : subHeadline
                } pad="none" label={label}
              >
                {this._renderCta()}
              </Card>
            </Box>
          </Box>
        );
      }
      return (
        <Box className={classes} pad={this.state.textPad}>
          <Box
            pad={textPad}
            colorIndex={transparentTextBackgroundColorIndex}
          >
            {logoMarkup}
            <Card
              size="full"
              contentPad="none"
              colorIndex=""
              textSize={stackSize}
              heading={
                <Headline strong margin="none">{headline}</Headline>
              }
              description={(typeof subHeadline === 'string') ?
                <Paragraph margin="medium" size={stackSize}>
                  {subHeadline}
                </Paragraph> : subHeadline
              }
              pad="none"
              label={label}
            >
              {this._renderCta()}
            </Card>
          </Box>
        </Box>
      );
    }
    return (
      <Box className={classes} pad={this.state.textPad}>
        <Box pad={textPad} colorIndex={transparentTextBackgroundColorIndex}>
          {logoMarkup}
          <Card
            size="full" contentPad="none" colorIndex=""
            textSize={stackSize} heading={
              <Headline strong margin="none">{headline}</Headline>
            }
            description={(typeof subHeadline === 'string') ?
              <Paragraph margin="medium" size={stackSize}>
                {subHeadline}
              </Paragraph> : subHeadline
            } pad="none" label={label}
          />
        </Box>
      </Box>
    );
  }

  _renderMarqueeContent() {
    const { backgroundOverlayColorIndex, flush, justify } = this.props;

    const full = flush ? 'horizontal' : false;
    const stack = this._renderStack();

    let overlayColorIndex;
    if (backgroundOverlayColorIndex) {
      overlayColorIndex = `${backgroundOverlayColorIndex}-a`;
    }

    if (justify === 'center') {
      return (
        <Box
          className={`${CLASS_ROOT}__overlay`}
          colorIndex={overlayColorIndex} justify={justify} align="center"
          primary full={full} direction="row" textAlign="center"
        >
          {stack}
        </Box>
      );
    }
    return (
      <Box
        className={`${CLASS_ROOT}__overlay`}
        colorIndex={overlayColorIndex} align="center" primary
        full={full} direction="row" reverse={this.state.reverse}
      >
        <Box
          className={`${CLASS_ROOT}__image`} align="center"
          justify="center"
        >
          {this._renderImage()}
        </Box>
        {stack}
      </Box>
    );
  }

  _renderMarquee() {
    const { responsiveBackgroundPosition, separator } = this.props;

    const classes = classnames(
      {
        [`${CLASS_ROOT}--bg-${responsiveBackgroundPosition}`]: responsiveBackgroundPosition,
        [`${CLASS_ROOT}--mobile-separator`]: separator,
      },
    );

    return (
      <Box className={classes}>
        {this._renderBackground()}
        {this._renderMarqueeContent()}
      </Box>
    );
  }

  _renderVideo() {
    const { overlayVideo } = this.props;

    return (
      <div
        className={`${CLASS_ROOT}__video-overlay`}
        key={this.state.timestamp}
      >
        <Anchor icon={<CloseIcon />} onClick={this._onClose} />
        {overlayVideo}
      </div>
    );
  }

  render() {
    const { className, responsiveDropText, size } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--show-video`]: this.state.showVideo,
        [`${CLASS_ROOT}--responsive-drop`]: responsiveDropText,
      },
    );

    let content;
    if (this.state.showVideo) {
      content = this._renderVideo();
    } else {
      content = this._renderMarquee();
    }

    return (
      <Box className={classes} colorIndex={this.state.colorIndex}>
        {content}
      </Box>
    );
  }
}

Marquee.propTypes = {
  backgroundImage: PropTypes.string,
  backgroundVideo: PropTypes.element,
  backgroundOverlayColorIndex: PropTypes.string,
  darkTheme: PropTypes.bool,
  flush: PropTypes.bool,
  headline: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  image: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  label: PropTypes.string,
  link: PropTypes.string,
  linkIcon: PropTypes.element,
  linkText: PropTypes.string,
  logo: PropTypes.string,
  onClick: PropTypes.func,
  overlayVideo: PropTypes.element,
  responsiveBackgroundPosition: PropTypes.oneOf(['left', 'center', 'right']),
  responsiveDropText: PropTypes.bool,
  separator: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  stackSize: PropTypes.oneOf(['medium', 'large', 'xlarge']),
  subHeadline: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  textBackgroundColorIndex: PropTypes.string,
};

Marquee.defaultProps = {
  darkTheme: true,
  flush: true,
  justify: 'end',
  responsiveBackgroundPosition: 'center',
  responsiveDropText: true,
  separator: false,
  size: 'large',
  stackSize: 'xlarge',
};
