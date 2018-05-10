import React from 'react';
import {
  Box,
  Form,
  Header,
  Heading,
  Footer,
  Button,
  Select,
  TextInput,
  NumberInput
} from 'grommet';

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
    console.log(this.state.cookingTime);
    return (
      <Box pad="medium">
        <Form>
          <Header>
            <Heading>Recept Toevoegen</Heading>
          </Header>
          <Select
            placeHolder="Type gerecht"
            value={this.state.recipeType}
            onChange={e => this.setState({ recipeType: e.option })}
            options={[
              'Voorgerecht',
              'Bijgerecht',
              'Hoofdgerecht',
              'Dessert',
              'Soep',
              'Saus'
            ]}
          />
          <TextInput id="item1" defaultValue="" name="bereidingstijd" />
          <NumberInput value={this.state.numPeople} />
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
