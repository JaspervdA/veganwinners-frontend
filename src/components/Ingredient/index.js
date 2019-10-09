import React from "react";
import Box from "grommet/components/Box";
import TextInput from "grommet/components/TextInput";
import FormField from "grommet/components/FormField";

class Ingredient extends React.Component {
  constructor(props) {
    super();
    this.state = {
      item: props.item,
      quantity: props.quantity
    };
  }

  render() {
    return (
      <Box
        direction="row"
        pad={{ horizontal: "none", vertical: "small", between: "small" }}
      >
        <FormField>
          <TextInput
            placeHolder={this.state.item ? null: "Ingredient"}
            defaultValue={this.state.item ? this.state.item: null}
            onDOMChange={async e => {
              await this.setState({ item: e.target.value });
              this.props.handleChange(this.state, this.props.id);
            }}
          />
        </FormField>
        <FormField>
          <TextInput
            placeHolder={
              this.state.quantity ? this.state.quantity : "Hoeveelheid"
            }
            onDOMChange={async e => {
              await this.setState({ quantity: e.target.value });
              this.props.handleChange(this.state, this.props.id);
            }}
          />
        </FormField>
      </Box>
    );
  }
}

export default Ingredient;
