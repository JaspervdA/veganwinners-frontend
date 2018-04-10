import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Recipe from './pages/Recipe';
import About from './pages/About';
import Home from './pages/Home';
import MenuBar from './components/MenuBar';
import {App as GrommetApp} from 'grommet';

export default () => (
  <GrommetApp>
    <MenuBar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/recipe/:id' component={Recipe} />
      <Route path='/about' component={About} />
    </Switch>
  </GrommetApp>
)
