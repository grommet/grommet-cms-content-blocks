// @flow
import iconMap from './iconMap';
import type { IconType } from './BlockButtonForm';

type Props = {
  icon: IconType,
}

export default function ({ icon }: Props): React$Element<*> {
  return iconMap[icon];
}