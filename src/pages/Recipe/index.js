import React from 'react';
import { Box, Image, Heading, Accordion, AccordionPanel, Paragraph, Table,
          TableRow, Columns } from 'grommet';
import { Clock, Restaurant, Group} from 'grommet-icons';
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
    return (
      <div>
        {this.state.isLoading && <Spinning />}
        {!this.state.isLoading &&
        <Box pad="medium">
          <Heading
           align='start'
           margin='medium'
           strong={true}
           tag='h2'>
           {this.state.recipe.title}
          </Heading>
          <Columns size="medium" justify="start">
            <Image src={this.state.recipe.img}
             size='large'
             />
             <Box pad={{horizontal:"medium",vertical:"medium"}}>
               <Restaurant /><Paragraph margin="small">{this.state.recipe.type}</Paragraph>
               <Group /> <Paragraph margin="small">{this.state.recipe.people} personen</Paragraph>
               <Clock /><Paragraph margin="small">{this.state.recipe.time}</Paragraph>
             </Box>
           </Columns>
           <Accordion openMulti={true}>
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
         </Box>
         }
       </div>
   )}
}

export default Recipe
