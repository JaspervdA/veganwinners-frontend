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

  getRecipes( numRecipes ){
    fetch(`http://localhost:8000/recipes/${numRecipes}`)
    .then(response => response.json())
      .then( data => this.setState({
        recipes:data.data
      })
   )};

  componentWillMount() {
    this.getRecipes(this.state.numRecipes);
  }

  render() {
   return (
     <Switch>
      <Route exact path='/' render={(props) => (
        <RecipeList {...props} data={{recipes:this.state.recipes}}/>
      )}/>
      <Route path='/recipe/:id' render={(props) => (
        <Recipe {...props} data={{recipes:this.state.recipes}}/>
      )}/>
    </Switch>
   )
 }
}

export default MainContent
