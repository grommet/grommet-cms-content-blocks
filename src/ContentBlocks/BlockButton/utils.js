// @flow
import unescape from 'unescape';
import type { AssetType } from './BlockButtonForm';

type AnalyticsType = 'Download' | 'Internal Reference' | 'External Reference' | 'Support';

export const getAssetType = (assetType: AssetType, path: ?string) => {
  if (assetType === 'path' && path && path.indexOf('.') < 0) {
    return 'path';
  }
  return 'href';
};

export function isDownloadLink(link: string) {
  return link.indexOf('.') >= 0 && link.indexOf('uploads') >= 0;
}

export function isContactLink(link: string) {
  return link.indexOf('mailto') >= 0;
}

export function isInternalLink(type: AssetType) {
  return type === 'path';
}

export function getLinkType(link: string, type: AssetType): AnalyticsType {
  if (isInternalLink(type)) {
    return 'Internal Reference';
  } else if (isContactLink(link)) {
    return 'Support';
  } else if (isDownloadLink(link)) {
    return 'Download';
  }
  return 'External Reference';
}

export const getAnalyticsType = (
  assetType: AssetType,
  path: ?string,
  href: ?string,
): AnalyticsType => {
  const type = getAssetType(assetType, path);
  let link;
  if (type === 'href' && href) {
    link = href;
  } else if (path && type === 'path') {
    link = path;
  } else {
    link = href || path || '';
  }
  const linkType = getLinkType(link, type);
  return linkType;
};

export const getLink = (assetType: AssetType, path: ?string, href: ?string) => {
  const type = getAssetType(assetType, path);
  if (type === 'path') {
    return {
      path: unescape(path || ''),
    };
  }
  return {
    href: unescape(href || path || ''),
  };
};
