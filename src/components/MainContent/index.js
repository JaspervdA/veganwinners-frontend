import React from 'react';
import RecipeList from '../RecipeList';
import Recipe from '../Recipe';
import { Switch, Route } from 'react-router-dom';

class MainContent extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      numRecipes: 5,
      recipes: [],
    }
  };

  getRecipes( numRecipes ){
    fetch(`http://localhost:8000/recipes/${numRecipes}`)
    .then(response => response.json())
      .then( data => this.setState({
        recipes:data.data,
        isLoading: false
      })
   )};

  componentDidMount() {
    this.getRecipes(this.state.numRecipes);
  }

  render() {
   return (
     <Switch>
      <Route exact path='/' render={(props) => (
        <RecipeList {...props} data={{recipes:this.state.recipes, isLoading:this.state.isLoading}}/>
      )}/>
      <Route path='/recipe/:id' component={Recipe}/>
    </Switch>
   )
 }
}

export default MainContent
