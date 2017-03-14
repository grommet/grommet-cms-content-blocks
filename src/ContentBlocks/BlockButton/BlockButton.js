/* @flow */
import React from 'react';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import type { AssetType, ButtonType } from './BlockButtonForm';

export type Props = {
  label?: string,
  path?: string,
  href?: string,
  assetType?: AssetType,
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
  let props = { label, primary: isPrimary };
  if (assetType === 'path') {
    props = { ...props, path };
  } else {
    props = { ...props, href };
  }
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
