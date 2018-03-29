import React from 'react';
import { Box, Image, Heading, Accordion, AccordionPanel, Paragraph, Table,
          TableRow } from 'grommet';
import recipes from '../../texts'

class Recipe extends React.Component{

   recipeId = this.props.match.params.id;

   render() {
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
             <Table scrollable={false}>
               <tbody>
                 {recipes[this.recipeId].ingredients.map((ingredient) =>
                     <TableRow key={ingredient.id}>
                       <td>
                         {ingredient.item}
                       </td>
                       <td className='secondary'>
                         {ingredient.quantity}
                       </td>
                     </TableRow>
                 )}
               </tbody>
             </Table>
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
