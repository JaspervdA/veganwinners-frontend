import React from 'react';
import { Box, Image, Heading, Accordion, AccordionPanel, Paragraph, Table,
          TableRow } from 'grommet';
import Spinning from 'grommet/components/icons/Spinning';


class Recipe extends React.Component{
  constructor() {
    super();
    this.state = {
      isLoading: true,
      recipe: [],
    }
  };

  getRecipe( recipeNumber ){
    fetch(`http://veganwinners.com/api/recipes/one/${recipeNumber}`)
    .then(response => response.json())
      .then( data => this.setState({
        recipe:data.data,
        isLoading:false
      })
  )};

  componentDidMount() {
    var recipeId = this.props.match.params.id
    this.getRecipe(recipeId);
  }


  render() {
    console.log(this)
    return (
      <Box pad='large'>
        {this.state.isLoading && <Spinning />}
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
             <Paragraph style={{whiteSpace:"pre-line"}}>
              {this.state.recipe.instructions}
             </Paragraph>
           </AccordionPanel>
         </Accordion>
        }
      </Box>
   )}
}

export default Recipe
