/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import isImage from './isImage';
import { NonImageThumbnail } from '../';
import tileSize from './sizer';
import imageMissing from '../missingImage';

type ImageType = 'img' | 'box';
export type ImageSize = "small" | "medium" | "large" | "thumb";

/* eslint-disable react/no-unused-prop-types */
type Props = {
  image: {
    path?: string,
    title?: string
  },
  size: ImageSize,
  type: ImageType
}
/* eslint-enable react/no-unused-prop-types */

export default function SmartImage({
  image,
  size,
  type = 'img',
}: Props) {
  const path = image && image.path ? image.path : imageMissing;
  const nonImageNode = <NonImageThumbnail size={size} />;
  if (type === 'img') {
    return isImage(path)
    ? (
      <Image alt={image.title || 'unknown'} size={size} src={path} />
      )
    : nonImageNode;
  }
  return isImage(path)
  ? (
    <Box
      texture={path}
      size={tileSize(size)}
      style={{
        backgroundSize: 'cover',
        maxHeight: 'unset',
        flexGrow: 1,
      }}
      colorIndex="grey-3"
    />
    )
  : nonImageNode;
}

