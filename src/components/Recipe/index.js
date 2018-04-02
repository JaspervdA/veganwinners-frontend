import React from 'react';
import { Box, Image, Heading, Accordion, AccordionPanel, Paragraph, Table,
          TableRow } from 'grommet';

class Recipe extends React.Component{

  recipeId = this.props.match.params.id;

  recipes = this.props.data.recipes;

  render() {
   console.log(this.recipeId)
   console.log(this.props)
   return (
     <Box pad='large'>
       <Image src={this.recipes[this.recipeId].img}
        full={true}
        fit='contain' />
       <Heading
        align='start'
        margin='medium'
        strong={true}
        tag='h1'>
        {this.recipes[this.recipeId].title}
       </Heading>
       <Accordion openMulti={true}>
         <AccordionPanel heading='Ingrediënten'>
           <Table scrollable={false}>
             <tbody>
               {this.recipes[this.recipeId].ingredients.map((ingredient) =>
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
           {this.recipes[this.recipeId].instructions}
           </Paragraph>
         </AccordionPanel>
       </Accordion>
     </Box>
   )
}
}

export default Recipe
