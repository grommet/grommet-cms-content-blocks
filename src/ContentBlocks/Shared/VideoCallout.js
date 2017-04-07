import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Heading from 'grommet/components/Heading';
import PlayIcon from 'grommet/components/icons/base/CirclePlay';

const ImageBox = styled(Box)`
  padding-bottom: 56%;
  background-position: 50% 50%;
  position: relative;
  @media all and (-ms-high-contrast:none) {
    height: 263px;
  }
`;

const InnerImageBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(PlayIcon)`
  max-height: 100%;
`;

export default function VideoCallout({ label, onClick, description, thumbnail }) {
  return (
    <div>
      {label && <Label uppercase>{label}</Label>}
      <ImageBox
        full="horizontal"
        align="center"
        justify="center"
        texture={thumbnail}
        onClick={onClick}
      >
        <InnerImageBox>
          <Icon size="xlarge" colorIndex="brand" />
        </InnerImageBox>
      </ImageBox>
      {description &&
        <Heading tag="h5" strong margin="small">
          {description}
        </Heading>
      }
    </div>
  );
}

VideoCallout.propTypes = {
  description: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  thumbnail: PropTypes.string,
};

VideoCallout.defaultProps = {
  thumbnail: '/img/dashboard/video-thumb.jpg',
};
