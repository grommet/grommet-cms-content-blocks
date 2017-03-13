/* @flow */
import React from 'react';
import Button from 'grommet/components/Button';

export type Props = {
  label?: string,
  path?: string,
  primary?: boolean,
}
export default function BlockButton(props: Props) {
  return (
    <Button
      {...props}
    />
  );
}
