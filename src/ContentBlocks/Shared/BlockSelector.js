// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';

type BlockProps = {
  title: string,
  onClick: () => void,
  wireframe: HTMLElement,
}

const Block = ({ title, onClick, wireframe }: BlockProps) =>
  <Button onClick={onClick}>
    <Box align="center" pad={{ vertical: 'small', horizontal: 'small' }}>
      <Box
        size={{ height: 'small', width: 'small' }} colorIndex="grey-4"
        pad={{
          horizontal: 'medium',
          vertical: 'small',
        }} justify="center"
      >
        {wireframe}
      </Box>
      <Heading tag="h3">
        {title}
      </Heading>
    </Box>
  </Button>;

type BlockSelectorProps = {
  onClick: Function,
  blockMap: {},
};

export default function BlockSelector({ onClick, blockMap }: BlockSelectorProps) {
  const blocks = Object.keys(blockMap).map((block, index) =>
    <Block
      title={blockMap[block].name} onClick={onClick.bind(this, block)}
      wireframe={blockMap[block].wireframe}
      key={`block-${index}`}
    />,
  );

  return (
    <Box full="horizontal">
      <Box pad={{ vertical: 'small' }} colorIndex="light-2">
        <Box direction="row" wrap justify="center">
          {blocks}
        </Box>
      </Box>
    </Box>
  );
}
