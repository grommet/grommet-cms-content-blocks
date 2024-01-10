import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';

const CLASS_ROOT = 'youtube-layer';

export default function YoutubeLayer({ url, onClose }) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/; // eslint-disable-line no-useless-escape
  const match = url.match(regExp);
  const vidId = match[2];

  return (
    <Layer className={CLASS_ROOT} closer onClose={onClose}>
      <Box
        full
        pad="large"
        alignSelf="center"
        align="center"
        justify="center"
      >
        <Box className={`${CLASS_ROOT}__video-container`} full="horizontal">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${vidId}`}
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      </Box>
    </Layer>
  );
}

YoutubeLayer.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
