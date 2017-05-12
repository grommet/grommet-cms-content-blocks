// @flow

import React from 'react';
import MailIcon from 'grommet/components/icons/base/Mail';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import ChatIcon from 'grommet/components/icons/base/Chat';
import ShareIcon from 'grommet/components/icons/base/Share';
import DocumentWordIcon from 'grommet/components/icons/base/DocumentWord';
import AttachmentIcon from 'grommet/components/icons/base/Attachment';
import DocumentZipIcon from 'grommet/components/icons/base/DocumentZip';
import DocumentDownloadIcon from 'grommet/components/icons/base/DocumentDownload';
import PrintIcon from 'grommet/components/icons/base/Print';
import type { IconType } from './BlockButtonForm';

type Props = {
  icon: IconType,
}

const map = {
  primary: <LinkNextIcon />,
  email: <MailIcon />,
  chat: <ChatIcon />,
  share: <ShareIcon />,
  attachment: <AttachmentIcon />,
  word: <DocumentWordIcon />,
  zip: <DocumentZipIcon />,
  download: <DocumentDownloadIcon />,
  print: <PrintIcon />,
};

export default function ({ icon }: Props) {
  return map[icon];
}