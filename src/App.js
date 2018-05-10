import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App as GrommetApp } from 'grommet';
import Recipe from './pages/Recipe';
import About from './pages/About';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';

export default () => (
  <GrommetApp>
    <MenuBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/about" component={About} />
      <Route path="/add" component={AddRecipe} />
    </Switch>
    <Footer />
  </GrommetApp>
);
