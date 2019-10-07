import React from "react";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Ingredient from "../Ingredient";

class IngredientInput extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ingredients: [
        ...props.ingredients,
        { quantity: undefined, item: undefined }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (ingredient, index) => {
    const ingredients = this.state.ingredients;
    ingredients[index] = ingredient;

    await this.setState({
      ingredients
    });

    this.props.updateIngredients(this.state.ingredients);
  };

  addIngredient(quantity, item) {
    this.setState({
      ingredients: [
        ...this.state.ingredients,
        { quantity: quantity, item: item }
      ]
    });
  }

  removeIngredient() {
    if (this.state.ingredients.length > 1) {
      this.setState({
        ingredients: this.state.ingredients.slice(0, -1)
      });
    }
  }

  render() {
    return (
      <Box direction="column">
        {[...Array(this.state.ingredients.length).keys()].map(number => (
          <Ingredient
            item={this.state.ingredients[number].item}
            quantity={this.state.ingredients[number].quantity}
            index={number}
            handleChange={this.handleChange}
          />
        ))}
        <Box
          direction="row"
          pad={{ horizontal: "none", vertical: "none", between: "small" }}
        >
          <Button
            label="Extra ingredient"
            primary={true}
            onClick={() => this.addIngredient(undefined, undefined)}
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
