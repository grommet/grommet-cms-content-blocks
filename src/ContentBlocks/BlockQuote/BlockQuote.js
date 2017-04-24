import React, { PropTypes } from 'react';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';
import unescape from 'unescape';

export default function BlockQuote({
  content,
  source,
  colorIndex,
  borderSize,
  label,
  linkUrl,
  linkText,
}) {
  const color = colorIndex || 'brand';
  const size = borderSize || 'medium';
  const unescapedContent = unescape(content || '');
  return (
    <Quote
      style={{ width: 'inherit' }}
      size={size}
      borderColorIndex={color}
      pad="large"
    >
      <Box pad="small">
        {label &&
          <Label margin="small" uppercase size="small" style={{ fontWeight: 700 }}>
            {label}
          </Label>
        }
        <Heading tag="h3">
          {unescapedContent}
        </Heading>
        {source &&
          <Paragraph className="grommetux-quote__credit">
            <strong>{source}</strong>
          </Paragraph>
        }
        {linkUrl && linkText &&
          <Anchor label={linkText} path={linkUrl} />
        }
      </Box>
    </Quote>
  );
}

BlockQuote.propTypes = {
  content: PropTypes.string,
  source: PropTypes.string,
  colorIndex: PropTypes.string,
  borderSize: PropTypes.string,
  label: PropTypes.string,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
};
