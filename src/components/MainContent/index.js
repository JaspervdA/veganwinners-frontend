import React from 'react';
import RecipeList from '../RecipeList';
import Recipe from '../Recipe';
import AddRecipe from '../AddRecipe';
import { Switch, Route } from 'react-router-dom';

class MainContent extends React.Component {
   render() {
     return (
       <Switch>
        <Route exact path='/' component={RecipeList}/>
        <Route path='/recipe/:id' component={Recipe}/>
       </Switch>
     )
   }
}

export default MainContent
