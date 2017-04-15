import React, { Component, PropTypes } from 'react';
import { ContentLayoutEngine, BlockTypeMap } from '../index';

export default class SectionLayoutRenderer extends Component {
  static renderBlocks(blocks) {
    if (!blocks && !blocks.length) {
      return null;
    }
    return blocks.map((block, index) => { // eslint-disable-line arrow-body-style
      if (!block.blockType) {
        return null;
      }
      return (!block.edit) ? React.cloneElement(
        BlockTypeMap[block.blockType].element,
        {
          ...block,
          key: `block-${index}`,
        },
      ) : undefined;
    });
  }

  render() {
    const { section, ...rest } = this.props;

    return (
      <ContentLayoutEngine
        {...rest}
        layout={section.layout}
        blocks={section.contentBlocks}
      >
        {SectionLayoutRenderer.renderBlocks(section.contentBlocks)}
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
};