import React from "react";
import {
  Box,
  Image,
  Heading,
  Accordion,
  AccordionPanel,
  Paragraph,
  Table,
  TableRow,
  Columns,
  Anchor,
  Carousel,
  Quote,
  FormField,
  Button,
  TextInput
} from "grommet";
import { Clock, Restaurant, Group, Cafeteria, Favorite } from "grommet-icons";
import Spinning from "grommet/components/icons/Spinning";
import DuoRow from "../../components/DuoRow";

class Recipe extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      recipe: [],
      review: undefined,
      credit: undefined,
      reviewCheck: true,
      creditCheck: true
    };
  }

  onSubmit = async recipeNumber => {
    await this.checkFields();

    if (this.state.creditCheck && this.state.reviewCheck) {
      fetch("http://veganwinners.com/api/recipes/review", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: recipeNumber,
          credit: this.state.credit,
          text: this.state.review
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            alert(
              "Bedankt voor je review! Veganwinners zal zo snel mogelijk je review keuren ;)"
            );
            window.location.reload();
          } else {
            alert(data.message);
          }
        });
    } else {
      alert("Je hebt je naam en/of je bericht niet ingevuld.");
    }
  };

  checkFields() {
    if (this.state.credit === undefined || this.state.credit === "") {
      this.setState({ creditCheck: false });
    }
    if (this.state.review === undefined || this.state.review === "") {
      this.setState({ reviewCheck: false });
    }
  }

  getRecipe(recipeNumber) {
    fetch(`http://veganwinners.com/api/recipes/${recipeNumber}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          recipe: data.data,
          isLoading: false
        })
      );
  }

  addLike = async recipeNumber => {
    fetch(`http://veganwinners.com/api/recipes/${recipeNumber}/likes`)
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          window.location.reload();
        } else {
          alert(data.message);
        }
      });
  };

  componentDidMount() {
    var recipeId = this.props.match.params.id;
    this.getRecipe(recipeId);
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <Spinning />}
        {!this.state.isLoading && (
          <Box pad="medium">
            <Heading align="start" margin="medium" strong={true} tag="h2">
              {this.state.recipe.title}
            </Heading>
            <Columns size="medium" justify="start">
              <Image src={this.state.recipe.img} size="large" />
              <Box pad={{ horizontal: "medium", vertical: "medium" }}>
                <Restaurant />
                <Paragraph margin="small">{this.state.recipe.owner}</Paragraph>
                <Cafeteria />
                <Paragraph margin="small">{this.state.recipe.type}</Paragraph>
                <Group />{" "}
                <Paragraph margin="small">
                  {this.state.recipe.people} personen
                </Paragraph>
                <Clock />
                <Paragraph margin="small">{this.state.recipe.time}</Paragraph>
              </Box>
            </Columns>
            <Anchor
              onClick={() => {
                this.addLike(this.props.match.params.id);
              }}
              icon={<Favorite style={{ stroke: "pink" }} />}
              label={" " + this.state.recipe.likes + " likes"}
            />
            <Accordion openMulti={true}>
              <AccordionPanel heading="Ingrediënten">
                <Table scrollable={false}>
                  <tbody>
                    {this.state.recipe.ingredients.map(ingredient => (
                      <TableRow key={ingredient.id}>
                        <td>{ingredient.item}</td>
                        <td className="secondary">{ingredient.quantity}</td>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </AccordionPanel>
              <AccordionPanel heading="Bereidingswijze">
                <Paragraph style={{ whiteSpace: "pre-line" }}>
                  {this.state.recipe.instructions}
                </Paragraph>
              </AccordionPanel>
            </Accordion>
            {this.state.recipe.reviews &&
            this.state.recipe.reviews.length > 0 ? (
              <Carousel autoplay={true} autoplaySpeed={5000}>
                {this.state.recipe.reviews.map(review => (
                  <Quote
                    size="large"
                    credit={review.credit}
                    borderColorIndex="brand"
                  >
                    <Paragraph>{review.text}</Paragraph>
                  </Quote>
                ))}
              </Carousel>
            ) : null}

            <DuoRow
              left={
                <FormField>
                  <textarea
                    value={this.state.review}
                    placeholder={"Schrijf hier je bericht..."}
                    rows="8"
                    cols="50"
                    onChange={e =>
                      this.setState({
                        review: e.target.value,
                        reviewCheck: true
                      })
                    }
                  />
                </FormField>
              }
              right={
                <Box pad="medium">
                  <Box pad="medium">
                    <Anchor label={"Laat jouw review achter!"} />{" "}
                  </Box>
                  <Box pad="medium">
                    <TextInput
                      value={this.state.credit}
                      placeHolder={"Je naam"}
                      onDOMChange={e =>
                        this.setState({
                          credit: e.target.value,
                          creditCheck: true
                        })
                      }
                    />
                  </Box>
                  <Box pad="medium">
                    <Button
                      label="Sturen"
                      primary={true}
                      onClick={() => {
                        // console.log(this.state.recipe.reviews);
                        this.onSubmit(this.props.match.params.id);
                      }}
                    />
                  </Box>
                </Box>
              }
            />
          </Box>
        )}
      </div>
    );
  }
}

export default Recipe;
