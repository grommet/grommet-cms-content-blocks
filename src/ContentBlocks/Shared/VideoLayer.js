import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Video from './VideoPlayer';

const CLASS_ROOT = 'video-layer';

export default function VideoLayer({ video, onClose, image }) {
  const isIE = !!navigator.userAgent.match(/Trident/g)
    || !!navigator.userAgent.match(/MSIE/g)
    || !!navigator.userAgent.match(/Edge/g);

  return (
    <Layer className={CLASS_ROOT} closer onClose={onClose}>
      <Box
        pad="small"
        alignSelf="center"
        style={{ minHeight: '90vh' }}
        align="center"
        justify="center"
      >
        <Box className={`${CLASS_ROOT}__video-container`} full="horizontal">
          <Video
            video={video}
            allowFullScreen={!isIE}
            size="large"
            autoPlay
            poster={image.path}
            title={video.title}
            full
          >
            <source src={video.path} />
          </Video>
        </Box>
      </Box>
    </Layer>
  );
}

VideoLayer.propTypes = {
  video: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
