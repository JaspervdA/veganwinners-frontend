import React from 'react';
import {Image, Heading, Accordion, AccordionPanel, Paragraph} from 'grommet';
import recipes from '../../texts'



class Recipe extends React.Component{
   render() {
   console.log(this.props.match)
     return (
       <div>
         <Image src={recipes[this.props.match.params.id].img}
          alt='Kan de foto niet laden'
          full={true}
          fit='contain' />
         <Heading
          align='start'
          margin='small'
          strong={true}
          tag='h1'>
          {recipes[this.props.match.params.id].title}
         </Heading>
         <Accordion openMulti={true}>
           <AccordionPanel heading='Ingrediënten'>
             <Paragraph>
               {recipes[this.props.match.params.id].ingredients.map((ingredient) =>
                 <p key={ingredient.id}>
                 {ingredient.item}
                 </p>)
               }
             </Paragraph>
           </AccordionPanel>
           <AccordionPanel heading='Bereidingswijze'>
             <Paragraph>
              {recipes[this.props.match.params.id].instructions}
             </Paragraph>
           </AccordionPanel>
         </Accordion>
       </div>
     )
   }
}

export default Recipe
