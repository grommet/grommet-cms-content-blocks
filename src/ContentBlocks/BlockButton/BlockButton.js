/* @flow */
import React from 'react';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import type { AssetType, ButtonType, IconType } from './BlockButtonForm';
import { getAnalyticsType, getLink } from './utils';
import IconPicker from './iconPicker';

export type Props = {
  label?: string,
  path?: string,
  href?: string,
  assetType: AssetType,
  buttonType?: ButtonType,
  primary?: boolean,
  icon?: IconType,
}
export default function BlockButton({
  buttonType,
  href,
  path,
  label,
  primary,
  assetType,
  icon,
}: Props) {
  const isPrimary = primary === 'True';
  const link = getLink(assetType, path, href);
  const tracking = {
    'data-analytics-track': 'true',
    'data-analytics-value': assetType === 'path' ? path : href,
    'data-analytics-type': getAnalyticsType(assetType, path, href),
    'data-analytics-category': buttonType,
  };
  let props = { label, primary: isPrimary, target: '_blank', ...tracking, ...link };
  if (buttonType === 'Button') {
    return (
      <Button {...props} />
    );
  } else if (buttonType === 'Anchor') {
    if (icon && primary) {
      props = {
        ...props,
        icon: <IconPicker icon={icon} />,
      };
    }
    return (
      <div>
        <Anchor {...props} />
      </div>
    );
  }
}
