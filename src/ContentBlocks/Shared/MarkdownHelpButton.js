import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';

export default function MarkdownHelpButton() {
  return (
    <Box direction="row" align="center" justify="start" pad={{ vertical: 'medium' }}>
      <Title>Markdown Supported</Title>
      <Button
        plain
        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
        target="_blank"
        rel="noopener noreferrer"
        icon={<CircleQuestionIcon />}
      />
    </Box>
  );
}

