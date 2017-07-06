import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import PlayIcon from 'grommet/components/icons/base/CirclePlay';
import Markdown from 'grommet/components/Markdown';
import unescape from 'unescape';
import colorMap from '../BlockImage/colorMap';

const borderStyles = ({ borderColor }) => {
  if (borderColor && colorMap[borderColor]) {
    return css`
      border-bottom: 9px solid ${colorMap[borderColor]};
    `;
  }
  return '';
};

const ImageBox = styled(Box)`
  ${props => borderStyles(props)}
  background-position: 50% 50%;
  position: relative;
  padding-bottom: 56.25% !important;
  width: 100%;
  @media screen and (max-width: 720px) {
    height: 263px;
    padding-bottom: 0 !important;
  }
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

export default function VideoCallout({
  label,
  onClick,
  description,
  thumbnail,
  video,
  borderColor,
}) {
  const markdownContent = unescape(description || '');
  const videoPath = video && video.path;
  const videoTitle = video && video.title;
  return (
    <div>
      {label && <Label uppercase>{label}</Label>}
      <ImageBox
        align="center"
        justify="center"
        data-analytics-track="true"
        data-analytics-type="Play"
        data-analytics-label={label || videoTitle}
        data-analytics-value={videoPath}
        borderColor={borderColor}
        texture={thumbnail}
        onClick={onClick}
      >
        <InnerImageBox>
          <Icon size="xlarge" colorIndex="brand" />
        </InnerImageBox>
      </ImageBox>
      <Markdown
        content={markdownContent}
        components={{
          p: { props: { size: 'medium', margin: 'small', align: 'start' } },
          h1: { props: { margin: 'none', align: 'start' } },
          h2: { props: { margin: 'none', align: 'start' } },
          h3: { props: { margin: 'none', align: 'start' } },
          h4: { props: { margin: 'none', align: 'start' } },
          h5: { props: { margin: 'none', align: 'start' } },
        }}
      />
    </div>
  );
}

VideoCallout.propTypes = {
  description: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  thumbnail: PropTypes.string,
  borderColor: PropTypes.oneOf([
    'red',
    'green',
    'none',
  ]),
  video: PropTypes.shape({
    path: PropTypes.string,
  }),
};

VideoCallout.defaultProps = {
  thumbnail: '/img/dashboard/video-thumb.jpg',
};
