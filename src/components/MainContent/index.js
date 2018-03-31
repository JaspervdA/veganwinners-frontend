import React from 'react';
import RecipeList from '../RecipeList';
import Recipe from '../Recipe';
import { Switch, Route } from 'react-router-dom';

class MainContent extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      numRecipes: 5,
    }
  };

  render() {
   return (
     <Switch>
      <Route exact path='/' component={RecipeList}/>
      <Route path='/recipe/:id' render={(props) => (
        <Recipe />
      )}/>
    </Switch>
   )
 }
}

export default MainContent
