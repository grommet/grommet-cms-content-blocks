import React, { Component, PropTypes } from 'react';
import { SectionLayoutRenderer } from '../index';

// eslint-disable-next-line react/prefer-stateless-function
export default class PostRenderer extends Component {
  render() {
    const { post } = this.props;
    const filteredSections = post.sections.filter(i => i.contentBlocks.length > 0);

    return (
      <div>
        {filteredSections && filteredSections.map((item, i) =>
          <SectionLayoutRenderer
            key={i}
            section={item}
          />,
        )}
      </div>
    );
  }
}

PostRenderer.propTypes = {
  post: PropTypes.shape({
    sections: PropTypes.arrayOf(
      PropTypes.shape({
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
        ),
      }),
    ),
  }),
};