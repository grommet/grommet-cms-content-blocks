import React, { Component } from 'react';
import { PostsRenderer } from 'grommet-cms-content-blocks';
import Layout from './Layout';
import state from './state';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
// eslint-disable-next-line
export default class App extends Component {
  render() {
    return (
      <span>
        <Layout>
          <PostsRenderer posts={state.posts} />
        </Layout>
      </span>
    );
  }
}
