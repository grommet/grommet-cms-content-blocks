import React, { Component } from 'react';
import { ContentLayoutEngine, BlockTypeMap } from '../ContentBlocks';

export default class ContentBlocks extends Component {
  static renderBlocks(blocks) {
    return blocks.map((block, index) => {
      return (!block.edit) ? React.cloneElement(
        BlockTypeMap[block.blockType].element,
        {
          ...block,
          key: `block-${index}`
        }
      ) : undefined;
    });
  }

  render() {
    const blocks = (this.props.blocks)
      ? ContentBlocks.renderBlocks(this.props.blocks)
      : undefined;

    return (
      <ContentLayoutEngine
        layout={this.props.layout}
        blocks={this.props.blocks}
      >
        {blocks}
      </ContentLayoutEngine>
    );
  }
};

ContentBlocks.propTypes = {
  blocks: React.PropTypes.arrayOf(

  ),
  layout: React.PropTypes.arrayOf(

  ).isRequired
};