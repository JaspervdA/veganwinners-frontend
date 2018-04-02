import React from 'react';
import { Box, Card } from 'grommet';
import { Link } from 'react-router-dom';

class RecipeList extends React.Component{
  constructor() {
    super();
    this.state = {
      numRecipes: 5,
    }
  };

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
         {this.props.data.recipes.map((recipe) =>
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
