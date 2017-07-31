// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import { BlockButton } from '../BlockButton';
import { BlockParagraph } from '../BlockParagraph';
import { BlockContainer, CTABox } from './styles';
import uuid from '../Shared/uuid';

type Cta = {
  label: string,
  path: string,
  assetType: 'path' | 'href',
  buttonType: 'Anchor' | 'Button',
  primary: 'True' | 'False',
}

type Props = {
  content: ?string,
  paragraphSize?: string,
  ctaArray: ?Array<Cta>,
}

export default function BlockParagraphCTAs({
  content,
  paragraphSize,
  ctaArray,
}: Props) {
  const length = ctaArray && ctaArray.length > 0 ? ctaArray.length : 0;
  const ctaArrayNodes = ctaArray && ctaArray.length > 0
    && ctaArray.map((cta, i) => (
      <CTABox key={uuid()} isLastElement={i === length - 1} pad="none" margin="none">
        <BlockButton {...cta} />
      </CTABox>
    ));
  const size = paragraphSize || 'medium';
  return (
    <BlockContainer id="block--block-paragraph-ctas">
      {content &&
        <BlockParagraph
          content={content}
          align="start"
          paragraphSize={size}
        />
      }
      { ctaArray && ctaArray.length > 0 &&
        <Box style={{ paddingTop: '12px' }}>
          {ctaArrayNodes}
        </Box>
      }
    </BlockContainer>
  );
}
