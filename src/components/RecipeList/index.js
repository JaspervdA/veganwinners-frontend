import React from 'react';
import Recipe from '../Recipe';
import { Box, Card } from 'grommet';
import recipes from '../../texts'


class RecipeList extends React.Component{
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
         {recipes.map((recipe) =>
           <Box direction='row'
            justify='start'
            pad='medium'
            margin='small'
            colorIndex='light-1'
            >
            <Card thumbnail={recipe.img}
                      heading={recipe.title}
              contentPad='medium' />
          </Box>
         )}
      </Box>
     )
   }
}

export default RecipeList
