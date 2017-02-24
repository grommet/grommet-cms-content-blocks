import React, { PropTypes, Component } from 'react';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';

export default class BlockHero extends Component {
  constructor() {
    super();
    this.setRandomIndex = this.setRandomIndex.bind(this);
    this.calculateRandomIndex = this.calculateRandomIndex.bind(this);
    this.state = {
      currentIndex: 0,
    };
  }
  componentWillMount() {
    this.setRandomIndex();
  }
  // Recursively calculate next random nextIndex
  calculateRandomIndex() {
    const { carousel } = this.props;
    const randomIndex = Math.floor(Math.random() * carousel.length);
    return randomIndex;
  }
  setRandomIndex() {
    const nextIndex = this.calculateRandomIndex();
    this.setState({
      currentIndex: nextIndex,
    });
  }
  render() {
    const { carousel, imageSize, headline, content } = this.props;
    const size = imageSize ? imageSize.toLowerCase() : 'large';
    const { currentIndex } = this.state;
    const image = carousel[currentIndex].image;
    const imagePath = image && image.path
      ? image.path
      : '';

    return (
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
    );
  }
}

BlockHero.propTypes = {
  carousel: PropTypes.array,
  imageSize: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string,
};
