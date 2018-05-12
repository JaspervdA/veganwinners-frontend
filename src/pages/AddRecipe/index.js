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
  Toast,
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

  onSubmit(data) {
    alert('Je recept is succesvol opgestuurd.');
    console.log(data);
  }

  render() {
    return (
      <Box pad="medium">
        <Form plain={true} onSubmit={this.onSubmit}>
          <Header>
            <Heading>Recept Toevoegen</Heading>
          </Header>
          <DuoRow
            left={<Title>{'Soort gerecht'}</Title>}
            right={
              <FormField>
                <Select
                  value={this.state.recipeType}
                  onChange={e => this.setState({ recipeType: e.option })}
                  options={recipeTypes}
                />
              </FormField>
            }
          />
          <DuoRow
            left={<Title>{'Bereidingstijd'}</Title>}
            right={
              <FormField>
                <TextInput id="item1" defaultValue="" name="bereidingstijd" />
              </FormField>
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
                <textarea rows="8" cols="50" />
              </FormField>
            }
          />
          <Footer pad={{ vertical: 'medium' }}>
            <Button
              label="Submit"
              type="submit"
              primary={true}
            />
          </Footer>
        </Form>
      </Box>
    );
  }
}

export default AddRecipe;
