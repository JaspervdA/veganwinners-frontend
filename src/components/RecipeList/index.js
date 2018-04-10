import React from 'react';
import { Box, Card } from 'grommet';
import { Link } from 'react-router-dom';
import Spinning from 'grommet/components/icons/Spinning';


class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      numRecipes: 10,
      recipes: [],
    }
  };

  getRecipes( numRecipes ){
    fetch(`http://veganwinners.com/api/recipes/${numRecipes}`)
    .then(response => response.json())
      .then( data => this.setState({
        recipes: data.data,
        isLoading: false
      })
   )};

  componentDidMount() {
    this.getRecipes(this.state.numRecipes);
  }

  render() {
    return (
      <Box justify='start'
       align='center'
       wrap={true}
       reverse={false}
       pad='medium'
       margin='medium'
       colorIndex='light-2'
       >
       {this.state.isLoading && <Spinning />}
       {!this.state.isLoading && this.state.recipes.map((recipe) =>
         <Box key={recipe.id}
         direction='row'
          justify='start'
          pad='medium'
          margin='small'
          colorIndex='light-1'
          >
          <Link to={{ pathname:`/recipe/${recipe.id}`}} style={{textDecoration: 'none'}}>
            <Card thumbnail={recipe.img}
                      heading={recipe.title}
              contentPad='medium' />
          </Link>
        </Box>
       )}
      </Box>
    )}
}

export default RecipeList
