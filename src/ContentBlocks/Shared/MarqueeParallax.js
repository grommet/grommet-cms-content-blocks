import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';

const CLASS_ROOT = 'marquee-parallax';
const LIGHT_COLORINDEX = 'light-1';
const DARK_COLORINDEX = 'grey-1';
const PALM_BREAKPOINT = 720;
const BOX_CONTAINER_CLASSNAME = 'box__container';

export default class MarqueeParallax extends Component {
  constructor(props) {
    super(props);
    this._handleScroll = this._handleScroll.bind(this);
    this._setBackgroundColorIndex = this._setBackgroundColorIndex.bind(this);

    this._backgroundImageSize = {
      width: undefined,
      height: undefined,
    };

    this.state = {
      colorIndex: props.darkTheme ? DARK_COLORINDEX : LIGHT_COLORINDEX,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll);
    window.addEventListener('resize', this._handleScroll);
    window.addEventListener('resize', this._setBackgroundColorIndex);
    this._setBackgroundColorIndex();
    this._getBackgroundImageRatio();

    setTimeout(() => {
      this._handleScroll();
    }, 100);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
    window.removeEventListener('resize', this._handleScroll);
    window.removeEventListener('resize', this._setBackgroundColorIndex);
  }

  _getBackgroundImageRatio() {
    const marqueeNode = ReactDOM.findDOMNode(this);
    const marquee = marqueeNode.getElementsByClassName(BOX_CONTAINER_CLASSNAME)[0];

    // cache original width and height to be used onScroll
    if (!this._backgroundImageSize.width || !this._backgroundImageSize.height) {
      const marqueeBackgroundImage = new Image();
      marqueeBackgroundImage.src = marquee.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];

      if (marqueeBackgroundImage.src) {
        // in order for this to work properly in Safari,
        // we have to do the lookup for the image original width and height async
        setTimeout(() => {
          this._backgroundImageSize = {
            width: marqueeBackgroundImage.width || undefined,
            height: marqueeBackgroundImage.height || undefined,
          };
        }, 100);
      }
    }

    return this._backgroundImageSize.width / this._backgroundImageSize.height;
  }

  _handleScroll() {
    const { size, zoom, zoomPercentage } = this.props;

    let marqueeOriginalHeight = window.innerHeight * 0.75;
    if (window.innerWidth < PALM_BREAKPOINT) {
      if (size === 'small') {
        marqueeOriginalHeight = 270;
      } else {
        marqueeOriginalHeight = 300;
      }
    } else if (size === 'small') {
      marqueeOriginalHeight = window.innerHeight * 0.60;
    }

    const marqueeNode = ReactDOM.findDOMNode(this);
    const marquee = marqueeNode.getElementsByClassName(BOX_CONTAINER_CLASSNAME)[0];
    const marqueeTop = marquee.getBoundingClientRect().top;
    const marqueeText = marqueeNode.getElementsByClassName('marquee-parallax__overlay')[0];

    const backgroundRatio = this._getBackgroundImageRatio();
    const marqueeRatio = marquee.offsetWidth / marqueeOriginalHeight;
    let backgroundHeight = 0;
    let backgroundWidth = 0;

    let startPositionPercentage = 1;
    if (zoom === 'out') {
      startPositionPercentage = 1 + (zoomPercentage / 100);
    }

    if (backgroundRatio > marqueeRatio) {
      // constrained by marquee height
      backgroundHeight = marqueeOriginalHeight;
      backgroundWidth = backgroundHeight * backgroundRatio;
    } else {
      // constrained by marquee width
      backgroundWidth = marquee.offsetWidth;
      backgroundHeight = backgroundWidth / backgroundRatio;
    }

    const positionRatio = (marqueeOriginalHeight + marqueeTop) / marqueeOriginalHeight;
    if (window.innerWidth >= PALM_BREAKPOINT) {
      marqueeText.style.opacity = positionRatio;

      if (-marqueeTop > marqueeOriginalHeight) {
        marqueeText.style.height = 0;
        marqueeText.style.top = `${marqueeOriginalHeight}px`;
      } else if (marqueeTop > 0) {
        marqueeText.style.height = `${marqueeOriginalHeight}px`;
        marqueeText.style.top = 0;
      } else {
        marqueeText.style.height = `${marqueeOriginalHeight + marqueeTop}px`;
        marqueeText.style.top = `${-marqueeTop}px`;
      }
    } else {
      marqueeText.style.opacity = 1;
      marqueeText.style.height = '';
      marqueeText.style.top = 0;
    }

    let zoomPositionRatio = positionRatio;
    let finalPositionPercentage = 1;
    if (zoom === 'out') {
      finalPositionPercentage = 1 + (zoomPercentage / 100);
    } else {
      zoomPositionRatio = 1 - positionRatio;
    }

    let positionPercentage;
    if (marqueeTop < 0 && marqueeTop >= -marqueeOriginalHeight) {
      positionPercentage = (zoomPositionRatio * zoomPercentage + 100) / 100;
    } else if (marqueeTop >= 0) {
      positionPercentage = startPositionPercentage;
    } else {
      positionPercentage = finalPositionPercentage;
    }

    marquee.style.backgroundSize = `${backgroundWidth * positionPercentage}px ${backgroundHeight * positionPercentage}px`;
  }

  _setBackgroundColorIndex() {
    const { darkTheme } = this.props;

    if (window.innerWidth < PALM_BREAKPOINT) {
      this.setState({ colorIndex: LIGHT_COLORINDEX });
    } else {
      this.setState({ colorIndex: darkTheme ? DARK_COLORINDEX : LIGHT_COLORINDEX });
    }
  }

  render() {
    const { backgroundImage, flush, headlineSize, headline, justify, link, linkIcon, linkText, onClick, subHeadline } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--bg-${this.props.responsiveBackgroundPosition}`]: this.props.responsiveBackgroundPosition,
        [`${CLASS_ROOT}--mobile-separator`]: this.props.separator,
      },
    );

    const full = flush ? 'horizontal' : false;

    const styles = {
      backgroundImage: `url(${backgroundImage})`,
    };

    const backgroundClasses = classnames(
      BOX_CONTAINER_CLASSNAME,
      {
        [`${BOX_CONTAINER_CLASSNAME}--full-horizontal`]: this.props.flush,
      },
    );

    let subHeadlineMarkup;
    if (subHeadline) {
      subHeadlineMarkup = (
        <Paragraph size="large" margin="none">{subHeadline}</Paragraph>
      );
    }

    let linkMarkup;
    if (link || onClick) {
      linkMarkup = (
        <h3><Anchor href={link} primary label={linkText} icon={linkIcon} onClick={onClick} /></h3>
      );
    }

    return (
      <Box className={classes} colorIndex={this.state.colorIndex}>
        <div className={backgroundClasses} style={styles} />
        <Box className="marquee-parallax__overlay" justify={justify} align="center" primary full={full} direction="row" >
          <Box pad={{ horizontal: 'large', vertical: 'large', between: 'medium' }}>
            <Headline size={headlineSize} strong margin="none">
              {headline}
            </Headline>
            {subHeadlineMarkup}
            {linkMarkup}
          </Box>
        </Box>
      </Box>
    );
  }
}

MarqueeParallax.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool,
  flush: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  headlineSize: PropTypes.oneOf(['small', 'medium', 'large']),
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  link: PropTypes.string,
  linkIcon: PropTypes.element,
  linkText: PropTypes.string,
  onClick: PropTypes.func,
  responsiveBackgroundPosition: PropTypes.oneOf(['left', 'center', 'right']),
  separator: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  subHeadline: PropTypes.string,
  zoom: PropTypes.oneOf(['in', 'out', 'none']),
  zoomPercentage: PropTypes.number,
};

MarqueeParallax.defaultProps = {
  darkTheme: true,
  flush: true,
  headlineSize: 'large',
  justify: 'end',
  linkText: 'Learn More',
  responsiveBackgroundPosition: 'center',
  separator: false,
  size: 'large',
  zoom: 'in',
  zoomPercentage: 25,
};