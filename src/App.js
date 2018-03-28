import React from 'react';
import MenuBar from './components/MenuBar';
import MainContent from './components/MainContent';
import Recipe from './components/Recipe';
import { App } from 'grommet';

export default () => (
  <App>
    <MenuBar />
    <MainContent />
  </App>
);
