import React from 'react';
import DuoRow from '../../components/DuoRow';
import IngredientInput from '../../components/IngredientInput';
import {
  Box,
  Form,
  Header,
  Heading,
  Footer,
  Button,
  Select,
  TextInput,
  FormField,
  Title,
  NumberInput
} from 'grommet';

const recipeTypes = [
  'Voorgerecht',
  'Bijgerecht',
  'Hoofdgerecht',
  'Dessert',
  'Soep',
  'Saus'
];

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      recipeType: undefined
    };
  }

  sendRecipeToDb() {
    this.setState({
      test: true
    });
  }

  render() {
    console.log()
    return (
      <Box pad="medium">
        <Form plain="true">
          <Header>
            <Heading>Recept Toevoegen</Heading>
          </Header>
          <DuoRow
            left={<Title>{'Soort gerecht'}</Title>}
            right={
              <Select
                value={this.state.recipeType}
                onChange={e => this.setState({ recipeType: e.option })}
                options={recipeTypes}
              />
            }
          />
          <DuoRow
            left={<Title>{'Bereidingstijd'}</Title>}
            right={
              <TextInput id="item1" defaultValue="" name="bereidingstijd" />
            }
          />
          <DuoRow
            left={<Title>{'Aantal personen'}</Title>}
            right={<NumberInput value={this.state.numPeople} />}
          />
          <DuoRow
            left={<Title>{'Ingrediënten'}</Title>}
            right={<IngredientInput />}
          />
          <DuoRow
            left={<Title>{'Bereidingswijze'}</Title>}
            right={
              <FormField>
                <textarea rows="4" cols="50">
                </textarea>
              </FormField>
            }
          />
          <Footer pad={{ vertical: 'medium' }}>
            <Button
              label="Submit"
              type="submit"
              primary={true}
              onClick={() => this.sendRecipeToDb()}
            />
          </Footer>
        </Form>
      </Box>
    );
  }
}

export default AddRecipe;
