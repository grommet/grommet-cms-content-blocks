import React, { PropTypes, Component } from 'react';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import unescape from 'unescape';

// eslint-disable-next-line react/prefer-stateless-function
export default class BlockHero extends Component {
  render() {
    const { carousel, imageSize, headline, content, button } = this.props;
    const size = imageSize ? imageSize.toLowerCase() : 'large';
    const randomIndex = Math.floor(Math.random() * carousel.length);
    const parsedContent = unescape(content || '');
    const image = carousel[randomIndex].image;
    const imagePath = image && image.path
      ? image.path
      : '';

    return (
      <Box
        id="grommet-cms-content-blocks--hero-box"
        align="center"
        justify="center"
        size={{ height: size, width: size }}
        full={size === 'full'}
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw' }}
        texture={imagePath}
      >
        <Box
          pad="large"
          align="center"
          justify="center"
          colorIndex="grey-4-a"
        >
          <Headline align="center" size="large" strong>
            {headline || ''}
          </Headline>
          <Markdown
            content={parsedContent}
            components={{
              p: { props: { size: 'large', margin: 'small', align: 'center' } },
              h2: { props: { strong: true, align: 'center' } },
            }}
          />
          {button && button.label &&
            <Button
              primary
              {...button}
            />
          }
        </Box>
      </Box>
    );
  }
}

BlockHero.propTypes = {
  carousel: PropTypes.array, // eslint-disable-line
  imageSize: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string,
  button: PropTypes.shape({
    label: PropTypes.string,
    path: PropTypes.string,
  }),
};
