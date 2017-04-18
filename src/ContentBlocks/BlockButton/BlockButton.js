/* @flow */
import React from 'react';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import type { AssetType, ButtonType } from './BlockButtonForm';
import { getAnalyticsType, getLink } from './utils';

export type Props = {
  label?: string,
  path?: string,
  href?: string,
  assetType: AssetType,
  buttonType?: ButtonType,
  primary?: boolean,
}
export default function BlockButton({
  buttonType,
  href,
  path,
  label,
  primary,
  assetType,
}: Props) {
  const isPrimary = primary === 'True';
  const link = getLink(assetType, path, href);
  const tracking = {
    'data-analytics-track': 'true',
    'data-analytics-value': path || href || '',
    'data-analytics-type': getAnalyticsType(assetType, path),
  };
  const props = { label, primary: isPrimary, target: '_blank', ...tracking, ...link };
  if (buttonType === 'Button') {
    return (
      <Button {...props} />
    );
  } else if (buttonType === 'Anchor') {
    return (
      <Anchor {...props} />
    );
  }
}
