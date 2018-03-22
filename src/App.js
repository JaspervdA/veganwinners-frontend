import React from 'react';
import MenuBar from './components/MenuBar';
import MainContent from './components/MainContent';
import {App, Article} from 'grommet'


export default () => (
  <App>
    <Article scrollStep={false}>
      <MenuBar />
      <MainContent />
    </Article>
  </App>
);
