import React from 'react';
import { Box, Image, Heading, Accordion, AccordionPanel, Paragraph, Table,
          TableRow } from 'grommet';

class Recipe extends React.Component{

  constructor() {
    super();
    this.state = {
      isLoading: true,
      recipe: [],
    }
  };

  getRecipe( recipeNumber ){
    console.log(`http://localhost:8000/recipes/one/${recipeNumber}`)
    fetch(`http://localhost:8000/recipes/one/${recipeNumber}`)
    .then(response => response.json())
      .then( data => this.setState({
        recipe:data.data,
        isLoading:false
      })
  )};

  componentDidMount() {
    var recipeId = this.props.match.params.id
    this.getRecipe(recipeId);
    console.log(this.state.recipe);
  }


  render() {
    console.log(this.state.recipe)
    console.log(this.state.isLoading)
    return (
      <Box pad='large'>
        { this.state.isLoading && <p>Loading the recipes... Hier moeten we nog een fancy spinner klussen.</p>}
        {!this.state.isLoading &&
         <Accordion openMulti={true}>
           <Image src={this.state.recipe.img}
            full={true}
            fit='contain' />
           <Heading
            align='start'
            margin='medium'
            strong={true}
            tag='h1'>
            {this.state.recipe.title}
           </Heading>
           <AccordionPanel heading='Ingrediënten'>
             <Table scrollable={false}>
               <tbody>
                 {this.state.recipe.ingredients.map((ingredient) =>
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
             {this.state.recipe.instructions}
             </Paragraph>
           </AccordionPanel>
         </Accordion>
        }
      </Box>
   )}
}

export default Recipe
