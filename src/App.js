import React from 'react';
import App from 'grommet/components/App';
import Menu from './components/Menu';
import MainContent from './components/MainContent';
import Article from 'grommet/components/Article'

export default () => (
  <App>
    <Article scrollStep={false}>
      <Menu />
      <MainContent />
    </Article>
  </App>
);
