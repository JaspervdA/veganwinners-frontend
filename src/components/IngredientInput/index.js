import React from 'react';
import { Box, Button, TextInput, FormField } from 'grommet';

class Ingredient extends React.Component {
  constructor() {
    super();
    this.state = {
      item: undefined,
      quantity: undefined
    };
  }

  render() {
    return (
      <Box
        direction="row"
        pad={{ horizontal: 'none', vertical: 'small', between: 'small' }}
      >
        <FormField>
          <TextInput
            placeHolder="Ingredient"
            onDOMChange={async e => {
              await this.setState({ item: e.target.value });
              this.props.handleChange(this.state, this.props.value);
            }}
          />
        </FormField>
        <FormField>
          <TextInput
            placeHolder="Hoeveelheid"
            onDOMChange={async e => {
              await this.setState({ quantity: e.target.value });
              this.props.handleChange(this.state, this.props.value);
            }}
          />
        </FormField>
      </Box>
    );
  }
}

class IngredientInput extends React.Component {
  constructor() {
    super();
    this.state = {
      numIngredients: 1,
      numbers: [1],
      ingredients: [{ quantity: undefined, item: undefined }]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (ingredient, index) => {
    const ingredients = this.state.ingredients;
    ingredients[index - 1] = ingredient;

    // update state
    await this.setState({
      ingredients
    });

    this.props.updateIngredients(this.state.ingredients)
  };

  addIngredient() {
    this.setState({
      numIngredients: this.state.numIngredients + 1,
      numbers: [...this.state.numbers, this.state.numIngredients + 1],
      ingredients: [
        ...this.state.ingredients,
        { quantity: undefined, item: undefined }
      ]
    });
  }

  removeIngredient() {
    if (this.state.numIngredients > 1) {
      this.setState({
        numIngredients: this.state.numIngredients - 1,
        numbers: this.state.numbers.slice(0, -1),
        ingredients: this.state.ingredients.slice(0, -1)
      });
    }
  }

  render() {
    return (
      <Box direction="column">
        {this.state.numbers.map(number => (
          <Ingredient
            key={number.toString()}
            value={number}
            handleChange={this.handleChange}
          />
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
