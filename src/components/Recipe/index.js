import React from 'react';
import {Image, Heading, Accordion, AccordionPanel, Paragraph} from 'grommet';
import recipe from '../../texts'

class Recipe extends React.Component{
   render() {
     return (
       <div>
         <Image src='/img/vegan-vegetables-freshhh.jpg'
          alt='Kan de foto niet laden'
          full={true}
          fit='contain' />
         <Heading
          align='start'
          margin='small'
          strong={true}
          tag='h1'>
          {recipe.title}
         </Heading>
         <Accordion openMulti={true}>
           <AccordionPanel heading='Ingrediënten'>
             <Paragraph>
               {recipe.ingredients.map((ingredient) =>
                 <p>{ingredient}</p>)}
             </Paragraph>
           </AccordionPanel>
           <AccordionPanel heading='Bereidingswijze'>
             <Paragraph>
              {recipe.instructions}
             </Paragraph>
           </AccordionPanel>
           <AccordionPanel heading='Reacties/Suggesties'>
             <Paragraph>
              {recipe.comments.map((comment) =>
                 <p>{comment}</p>)}
             </Paragraph>
           </AccordionPanel>
         </Accordion>
       </div>
     )
   }
}

export default Recipe
