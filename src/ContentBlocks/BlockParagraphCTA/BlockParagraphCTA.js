// @flow
import React from 'react';
import Markdown from 'grommet/components/Markdown';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import unescape from 'unescape';

type Props = {
  content: ?string,
  align: 'start' | 'center' | 'end',
  label: string,
  href: string,
}

export default function BlockParagraphCTA({
  content,
  align = 'start',
  label,
  href,
}: Props) {
  const markdownContent = unescape(content || '');
  return (
    <Box id="block--block-paragraph-cta">
      <Markdown
        content={markdownContent}
        components={{
          p: { props: { size: 'medium', margin: 'small', align } },
          h1: { props: { margin: 'none', align } },
          h2: { props: { margin: 'none', align } },
          h3: { props: { margin: 'none', align } },
          h4: { props: { margin: 'none', align } },
          h5: { props: { margin: 'none', align } },
        }}
      />
      {href && label &&
        <Footer pad={{ vertical: 'small' }} style={{ display: 'inline-block' }}>
          <Anchor
            data-analytics-track="true"
            data-analytics-value={href}
            data-analytics-category="Anchor"
            data-analytics-type="Internal Reference"
            data-analytics-label={label}
            primary
            target="_blank"
            rel="noopener"
            href={href}
            label={label}
          />
        </Footer>
      }
    </Box>
  );
}
