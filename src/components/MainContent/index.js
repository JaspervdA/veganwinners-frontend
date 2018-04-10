import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Recipe from '../../pages/Recipe';
import About from '../../pages/About';
import Home from '../../pages/Home';

class MainContent extends React.Component {
  render() {
   return (
     <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/recipe/:id' component={Recipe} />
      <Route path='/about' component={About} />
    </Switch>
   )
 }
}

export default MainContent
