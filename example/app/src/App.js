import React, { Component } from 'react';
import GrommetApp from 'grommet/components/App';
import { PostsRenderer, BlockVideo } from 'grommet-cms-content-blocks';
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
      <GrommetApp centered={false}>
        <BlockVideo
          video={{
            path: 'https://grommet-bc-prd-lb.itcs.hpe.com/uploads/media/2017/2/Whats%20in%20a%20Name-%20v6%20conversion.mp4',
          }}
          image={{
            path: 'https://grommet-bc-prd-lb.itcs.hpe.com/uploads/media/2017/4/brandcentral_page_images_video_naming-1492536866662.jpg',
          }}
        />
      </GrommetApp>
    );
  }
}
/*
<span>
  <Layout>
    <PostsRenderer posts={state.posts} />
  </Layout> 
</span> */