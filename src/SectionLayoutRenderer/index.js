import React, { Component, PropTypes } from 'react';
import { ContentLayoutEngine, BlockTypeMap } from '../';

export default class SectionLayoutRenderer extends Component {
  static renderBlocks(blocks) {
    if (!blocks && !blocks.length) {
      return null;
    }
    return blocks.map((block, index) => { // eslint-disable-line arrow-body-style
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
    const { section } = this.props;

    return (
      <ContentLayoutEngine
        layout={section.layout}
        blocks={section.contentBlocks}
      >
        {ContentLayoutEngine.renderBlocks(section.contentBlocks)}
      </ContentLayoutEngine>
    );
  }
}

SectionLayoutRenderer.propTypes = {
  section: PropTypes.shape({
    contentBlocks: PropTypes.arrayOf(
      PropTypes.shape({
        blockType: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
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