/* @flow */
import React, { Component } from 'react';
import type { LayoutProps } from './flowTypes';
import assignedLayoutProps from './utils';
import { Box, Section } from './styles';

export default class ContentLayoutEngine extends Component {
  static defaultProps = {
    applyLayout: true,
  };
  props: LayoutProps;

  renderBlocks(children: Array<Object>, blocks: Array<Object>) {
    const blockArray = [];
    const { applyLayout } = this.props;
    children.map((item, i) => { // eslint-disable-line array-callback-return
      let newLineIndex;
      const blockLayout = blocks[i].layout;
      const blockType = (item && item.props && item.props.blockType)
        ? item.props.blockType
        : undefined;

      if (item && item.props && item.props.layout) {
        newLineIndex = item.props.layout.findIndex(
          layoutItem => layoutItem.name === 'newLine',
        );

        if (newLineIndex !== undefined
            && newLineIndex > -1
            && item.props.layout[newLineIndex].value === 'true') {
          blockArray.push(<Box key={`new-line-${i}`} full="horizontal" />);
        }
      }

      blockArray.push(
        <Box
          key={i}
          hideForResponsive={item.props.blockType === 'BlockSpacer' || false}
          {...assignedLayoutProps(blockLayout, applyLayout, blockType)}
        >
          {item}
        </Box>,
      );
    });

    return blockArray;
  }

  render() {
    const { blocks, layout, applyLayout, children } = this.props;
    const renderedBlocks = this.renderBlocks(children, blocks);

    return (
      <Section
        wrap
        {...assignedLayoutProps(layout, applyLayout)}
      >
        {renderedBlocks}
      </Section>
    );
  }
}
