import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Heading from 'grommet/components/Heading';
import QuoteComponent from 'grommet/components/Quote';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import unescape from 'unescape';

const Quote = styled(QuoteComponent)`
  border-color: #32dac8;
`;

export default function BlockQuote({
  content,
  source,
  colorIndex,
  borderSize,
  label,
  linkUrl,
  linkText,
}) {
  const color = colorIndex || '';
  const size = borderSize || 'medium';
  const unescapedContent = unescape(content || '');
  return (
    <Quote
      style={{ width: 'inherit' }}
      size={size}
      borderColorIndex={color}
      credit={
        source && <Box pad="none">
          <Label uppercase margin="small">
            {source}
          </Label>
        </Box>
      }
    >
      <Box>
        {label &&
          <Label margin="small" uppercase size="small" style={{ fontWeight: 700 }}>
            {label}
          </Label>
        }
        <Box pad={{ vertical: 'small' }}>
          <Heading tag="h2" margin="none">
            {unescapedContent}
          </Heading>
        </Box>
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
