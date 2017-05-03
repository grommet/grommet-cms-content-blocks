// @flow
import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import CirclePlayIcon from 'grommet/components/icons/base/CirclePlay';
import { YoutubeLayer } from '../Shared';
import type { Asset } from '../../types';

/* eslint-disable react/no-unused-prop-types */
type CardType = {
  heading: string,
  label: string,
  linkText: string,
  linkUrl: string,
  content: string,
}
/* eslint-enable react/no-unused-prop-types */

type Props = {
  card: CardType,
  image: Asset,
}

type State = {
  layerActive: boolean,
  layerContent: string,
}

export default class BlockCard extends Component {
  static isLinkVideo: (url: string) => boolean;
  static isLinkVideo(url: string) {
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
       // $FlowFixMe
      return url.match(p)[1];
    }
    return false;
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      layerActive: false,
      layerContent: '',
    };

    this.toggleVideoLayer = this.toggleVideoLayer.bind(this);
  }

  state: State;

  toggleVideoLayer: (videoUrl: string) => void;
  toggleVideoLayer(videoUrl: string) {
    this.setState({
      layerActive: !this.state.layerActive,
      layerContent: videoUrl,
    });
  }

  props: Props;

  render() {
    const { card, image } = this.props;
    const { heading, label, linkText, linkUrl, content } = card;

    const videoLayer = (this.state.layerActive)
      ? (<YoutubeLayer
        url={this.state.layerContent}
        onClose={this.toggleVideoLayer}
      />)
      : undefined;

    const anchor = (BlockCard.isLinkVideo(linkUrl))
      ? (<Anchor
        label={linkText} icon={<CirclePlayIcon />}
        onClick={this.toggleVideoLayer.bind(this, linkUrl)}
      />)
      : <Anchor label={linkText} href={linkUrl} />;

    return (
      <div>
        {videoLayer}
        <Card
          contentPad="medium"
          thumbnail={
            <Box className="block--block-card_card-thumbnail-wrapper">
              <Box
                className="block--block-card_card-thumbnail"
                style={{ backgroundSize: 'contain' }}
                texture={`url(${image.path})`}
              />
            </Box>
          }
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
}
