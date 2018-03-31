import React from 'react';
import { Box, Card } from 'grommet';
import recipes from '../../texts';
import { Link } from 'react-router-dom';

class RecipeList extends React.Component{
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
     console.log(this.state.recipes)
     return (
       <Box justify='start'
         align='center'
         wrap={true}
         reverse={false}
         pad='medium'
         margin='medium'
         colorIndex='light-2'
         >
         {this.state.recipes.map((recipe) =>
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
     )
   }
}

export default RecipeList
