import React, { Component, PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import CirclePlayIcon from 'grommet/components/icons/base/CirclePlay';
import { YoutubeLayer } from '../Shared';

export default class BlockCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layerActive: false,
      layerContent: ''
    };

    this._toggleVideoLayer = this._toggleVideoLayer.bind(this);
  }

  _toggleVideoLayer(videoUrl) {
    this.setState({ 
      layerActive: !this.state.layerActive,
      layerContent: videoUrl
    });
  }

  _isLinkVideo(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }

  render() {
    const { card, image } = this.props;
    const { heading, label, linkText, linkUrl, content } = card;

    const videoLayer = (this.state.layerActive)
      ? <YoutubeLayer url={this.state.layerContent} 
          onClose={this._toggleVideoLayer} />
      : undefined;

    const anchor = (this._isLinkVideo(linkUrl))
      ? <Anchor label={linkText} icon={<CirclePlayIcon />}
          onClick={this._toggleVideoLayer.bind(this, linkUrl)} />
      : <Anchor label={linkText} href={linkUrl} />;

    return (
      <div>
        {videoLayer}
        <Card
          contentPad="small"
          thumbnail={image.path}
          label={
            <Label uppercase margin="none" size="small" className="block--block-card__card-label">
              {label}
            </Label>
          }
          description={content}
          heading={heading &&
            <Box pad={{ vertical: 'small' }}>
              <Heading tag="h3" margin="none">
                {heading}
              </Heading>
            </Box>
          }
          colorIndex="light-1"
          link={anchor} 
        />
      </div>
    );
  }
};

BlockCard.propTypes = {
  content: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string
  })
};
