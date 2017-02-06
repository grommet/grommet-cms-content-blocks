import React, { Component, PropTypes } from 'react';
import { PostRenderer } from '../index';

// eslint-disable-next-line react/prefer-stateless-function
export default class PostsRenderer extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div>
        {posts && posts.map((item, i) =>
          <PostRenderer
            key={i}
            post={item}
          />,
        )}
      </div>
    );
  }
}

PostsRenderer.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      sections: PropTypes.arrayOf(
        PropTypes.shape({
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
          ),
        }),
      ),
    }),
  ),
};