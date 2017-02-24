import React, { PropTypes, Component } from 'react';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';
import Animate from 'grommet/components/Animate';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';

export default class BlockHero extends Component {
  constructor() {
    super();
    this.setRandomIndex = this.setRandomIndex.bind(this);
    this.calculateRandomIndex = this.calculateRandomIndex.bind(this);
    this.state = {
      currentIndex: 1,
      visible: false,
    };
  }
  componentWillMount() {
    this.setRandomIndex();
  }
  // Recursively calculate next random nextIndex
  calculateRandomIndex(carousel, currentIndex) {
    const randomIndex = Math.floor(Math.random() * carousel.length);
    // Basecase, randomIndex is not current index
    if (randomIndex !== currentIndex) {
      return randomIndex;
    }
    return this.calculateRandomIndex(carousel, currentIndex);
  }
  setRandomIndex() {
    const { carousel } = this.props;
    const { currentIndex } = this.state;
    const nextIndex = this.calculateRandomIndex(carousel, currentIndex);
    this.setState({
      currentIndex: nextIndex,
      visible: true,
    });
  }
  render() {
    const { carousel, imageSize, headline, content } = this.props;
    const size = imageSize ? imageSize.toLowerCase() : 'large';
    const { currentIndex, visible } = this.state;
    const image = carousel[currentIndex].image;
    const imagePath = image && image.path
      ? image.path
      : '';

    return (
      <Animate
        keep
        visible={visible}
        enter={{ animation: 'fade', duration: 1000, delay: 0 }}
        leave={{ animation: 'fade', duration: 1000, delay: 0 }}
      >
        <Box
          align="center"
          justify="center"
          size={{ height: size, width: size }}
          full={size === 'full'}
          style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw' }}
          texture={imagePath}
        >
          <Box
            pad="medium"
            align="center"
            justify="center"
            colorIndex="grey-4-a"
          >
            <Headline align="center" size="large" strong>
              {headline || ''}
            </Headline>
            <Markdown
              content={content || ''}
              components={{
                p: { props: { size: 'large', margin: 'small', align: 'center' } },
                h2: { props: { strong: true, align: 'center' } },
              }}
            />
            <Button label="Get Started" path="/brand-central/main" />
          </Box>
        </Box>
      </Animate>
    );
  }
}

BlockHero.propTypes = {
  carousel: PropTypes.array,
  imageSize: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string,
};
