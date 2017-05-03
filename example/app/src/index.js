import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import './utils/objectAssign';
import App from './App';
import './index.scss';

const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );

render(App);
if (module.hot) module.hot.accept('./App', () => render(App));
