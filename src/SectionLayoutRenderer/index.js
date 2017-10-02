import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ContentLayoutEngine, BlockTypeMap } from '../index';

export default class SectionLayoutRenderer extends Component {
  static renderBlocks(blocks, blockMap) {
    if (!blocks && !blocks.length) {
      return null;
    }

    // Merge user supplied content blocks with default set.
    let mergedBlockMap = BlockTypeMap;
    if (blockMap) {
      mergedBlockMap = {
        ...BlockTypeMap,
        ...blockMap
      }
    }

    return blocks.map((block, index) => { // eslint-disable-line arrow-body-style
      if (!block.blockType) {
        return null;
      }
      return (!block.edit) ? React.cloneElement(
        mergedBlockMap[block.blockType].element,
        {
          ...block,
          key: `block-${index}`,
        },
      ) : undefined;
    });
  }

  render() {
    const { section, blockMap, ...rest } = this.props;

    return (
      <ContentLayoutEngine
        {...rest}
        layout={section.layout}
        blocks={section.contentBlocks}
      >
        {SectionLayoutRenderer.renderBlocks(section.contentBlocks, blockMap)}
      </ContentLayoutEngine>
    );
  }
}

SectionLayoutRenderer.propTypes = {
  section: PropTypes.shape({
    contentBlocks: PropTypes.arrayOf(
      PropTypes.shape({
        blockType: PropTypes.string.isRequired,
        content: PropTypes.string,
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
    layout: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      }),
    ).isRequired,
  }),
  blockMap: PropTypes.object
};