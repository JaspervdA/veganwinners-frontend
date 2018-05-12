import React from 'react';
import { Box, Button, TextInput, FormField } from 'grommet';

const Ingredient = () => {
  return (
    <Box
      direction="row"
      pad={{ horizontal: 'none', vertical: 'small', between: 'small' }}
    >
      <FormField>
        <TextInput placeHolder="Ingredient" />
      </FormField>
      <FormField>
        <TextInput placeHolder="Hoeveelheid" />
      </FormField>
    </Box>
  );
};

class IngredientInput extends React.Component {
  constructor() {
    super();
    this.state = {
      numIngredients: 1,
      numbers: [1]
    };
  }

  addIngredient() {
    this.setState({
      numIngredients: this.state.numIngredients + 1,
      numbers: [...this.state.numbers, this.state.numIngredients + 1]
    });
  }

  removeIngredient() {
    if (this.state.numIngredients > 1) {
      this.setState({
        numIngredients: this.state.numIngredients - 1,
        numbers: this.state.numbers.slice(0, -1)
      });
    }
  }

  render() {
    return (
      <Box direction="column">
        {this.state.numbers.map(number => (
          <Ingredient key={number.toString()} value={number} />
        ))}
        <Box
          direction="row"
          pad={{ horizontal: 'none', vertical: 'none', between: 'small' }}
        >
          <Button
            label="Extra ingredient"
            primary={true}
            onClick={() => this.addIngredient()}
          />
          <Button
            label="Ingredient minder"
            primary={true}
            onClick={() => this.removeIngredient()}
          />
        </Box>
      </Box>
    );
  }
}

export default IngredientInput;
