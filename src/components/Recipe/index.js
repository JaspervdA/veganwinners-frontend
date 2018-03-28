import React from 'react';
import {Image, Heading, Accordion, AccordionPanel, Paragraph} from 'grommet';
import recipes from '../../texts'

class Recipe extends React.Component{

   recipeId = this.props.match.params.id;

   render() {
   console.log(this.recipeId)
     return (
       <div>
         <Image src={recipes[this.recipeId].img}
          alt='Kan de foto niet laden'
          full={true}
          fit='contain' />
         <Heading
          align='start'
          margin='small'
          strong={true}
          tag='h1'>
          {recipes[this.recipeId].title}
         </Heading>
         <Accordion openMulti={true}>
           <AccordionPanel heading='Ingrediënten'>
             <Paragraph>
               {recipes[this.recipeId].ingredients.map((ingredient) =>
                 <p key={ingredient.id}>
                 {ingredient.item}
                 </p>)
               }
             </Paragraph>
           </AccordionPanel>
           <AccordionPanel heading='Bereidingswijze'>
             <Paragraph>
             {recipes[this.recipeId].instructions}
             </Paragraph>
           </AccordionPanel>
         </Accordion>
       </div>
     )
   }
}

export default Recipe
