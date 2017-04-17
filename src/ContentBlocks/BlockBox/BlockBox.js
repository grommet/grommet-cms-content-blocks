/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import unescape from 'unescape';
import BoxWithBorder from './box';
import { BlockParagraph } from '../BlockParagraph';

type Align = 'start' | 'center' | 'end';

export default function BlockBox(props: {
  align: ?Align,
  content: ?string,
  colorIndex: ?string,
  borderColor: ?string,
}) {
  const { align, content, colorIndex, borderColor } = props;
  const grommetBoxAlign = align || 'center';
  const unescapedContent = unescape(content || '');
  return (
    <BoxWithBorder
      borderColor={borderColor}
      align={grommetBoxAlign}
      justify="center"
      size={{ height: 'small' }}
      colorIndex={colorIndex || 'light-1'}
    >
      <Box pad="small">
        <BlockParagraph align={grommetBoxAlign} content={unescapedContent} />
      </Box>
    </BoxWithBorder>
  );
}
