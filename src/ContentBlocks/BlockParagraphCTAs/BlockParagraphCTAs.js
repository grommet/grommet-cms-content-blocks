// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import { BlockButton } from '../BlockButton';
import { BlockParagraph } from '../BlockParagraph';

type Cta = {
  label: string,
  path: string,
  assetType: 'path' | 'href',
  buttonType: 'Anchor' | 'Button',
  primary: 'True' | 'False',
}
type Props = {
  content: ?string,
  paragraphSize: string,
  ctaArray: ?Array<Cta>,
}

export default function BlockParagraphCTAs({
  content,
  paragraphSize,
  ctaArray,
}: Props) {
  return (
    <Box id="block--block-paragraph-ctas">
      { content &&
        <BlockParagraph
          content={content}
          align="start"
          paragraphSize={paragraphSize}
        />
      }
      {ctaArray && ctaArray.length > 0 &&
        ctaArray.map(cta => (
          <BlockButton {...cta} />
        ))
      }
    </Box>
  );
}
