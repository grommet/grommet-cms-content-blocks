/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import unescape from 'unescape';
import { BlockParagraph } from '../BlockParagraph';

export default function BlockBox(props: {
  align: ?string,
  content: ?string,
  colorIndex: ?string,
}) {
  const { align, content, colorIndex } = props;
  const grommetBoxAlign = align || 'center';
  const unescapedContent = unescape(content || '');
  return (
    <Box
      align={grommetBoxAlign}
      justify="center"
      size={{ height: 'small' }}
      colorIndex={colorIndex || 'light-1'}
    >
      <Box pad="small">
        <BlockParagraph content={unescapedContent} />
      </Box>
    </Box>
  );
}
