import React, { PropTypes } from 'react';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

export default function BlockQuote({ content, source, colorIndex, borderSize, label, linkUrl, linkText }) {
  const color = colorIndex || 'brand';
  const size = borderSize || 'medium';
  return (
    <Quote
      style={{ width: 'inherit' }}
      size={size}
      borderColorIndex={color}
      pad="large"
      credit={source}
    >
      <Box pad="small">
        {label &&
          <Label margin="small" uppercase size="small" style={{ fontWeight: 700 }}>
            {label}
          </Label>
        }
        <Heading tag="h3">
          {content}
        </Heading>
        {linkUrl && linkText &&
          <Anchor label={linkText} path={linkUrl} />
        }
      </Box>
    </Quote>
  );
}

BlockQuote.propTypes = {
  content: PropTypes.string,
  source: PropTypes.string
};
