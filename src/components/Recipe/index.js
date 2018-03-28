import React from 'react';
import {Image, Heading, Accordion, AccordionPanel, Paragraph} from 'grommet';
import recipes from '../../texts'

class Recipe extends React.Component{
   render() {
     return (
       <div>
         <Image src={recipes[0].img}
          alt='Kan de foto niet laden'
          full={true}
          fit='contain' />
         <Heading
          align='start'
          margin='small'
          strong={true}
          tag='h1'>
          {recipes[0].title}
         </Heading>
         <Accordion openMulti={true}>
           <AccordionPanel heading='Ingrediënten'>
             <Paragraph>
               {recipes[0].ingredients.map((ingredient) =>
                 <p key={ingredient.id}>
                 {ingredient.item}
                 </p>)
               }
             </Paragraph>
           </AccordionPanel>
           <AccordionPanel heading='Bereidingswijze'>
             <Paragraph>
              {recipes[0].instructions}
             </Paragraph>
           </AccordionPanel>
         </Accordion>
       </div>
     )
   }
}

export default Recipe
