import React from "react";
import Box from "grommet/components/Box";
import Columns from "grommet/components/Columns";
import Image from "grommet/components/Image";
import Anchor from "grommet/components/Anchor";
import TextInput from "grommet/components/TextInput";
import Title from "grommet/components/Title";

import { Favorite } from "grommet-icons";
import { Link } from "react-router-dom";
import Spinning from "grommet/components/icons/Spinning";

function getColor(id) {
  let colors = [
    "#1565C0",
    "#FBC02D",
    "#FB8C00",
    "#880E4F",
    "#2E7D32",
    "#ef9a9a",
    "#26C6DA"
  ];
  // blauw, okergeel, oranje, paars, groen, roze, turqoise
  let randomnumber = Math.floor(Math.random() * 100);
  return colors[(id + randomnumber) % 7];
}

class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      recipes: [],
      search: "*",
      newSearch: "*"
    };
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

  getRecipes() {
    fetch(`http://veganwinners.com/api/recipes/approved/${this.state.search}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          recipes: data.data,
          isLoading: false
        })
      );
  }

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    return (
      <Box>
        <Box
          size="auto"
          direction="row"
          align="center"
          justify="center"
          pad="small"
        >
          <Box pad="medium">
            <Title>{"Zoeken:"}</Title>
          </Box>
          <Box size="medium">
            <TextInput
              value={this.state.search}
              onDOMChange={async e => {await this.setState({ search: e.target.value }); this.getRecipes()}}
            />
          </Box>
        </Box>
        <Columns size="medium" justify="center" maxCount={3}>
          {this.state.isLoading && <Spinning />}
          {!this.state.isLoading &&
            this.state.recipes.map(recipe => (
              <Box
                key={recipe.id}
                align="center"
                justify="center"
                pad="small"
                margin="small"
                style={{
                  backgroundColor: getColor(recipe.id),
                  boxShadow: "7px 7px 5px #B0BEC5",
                  borderColor: "#B0BEC5",
                  borderRadius: "12px"
                }}
              >
                <Link
                  to={{ pathname: `/recipe/${recipe.id}` }}
                  style={{
                    textDecoration: "none",
                    color: "#FFFFFF",
                    fontWeight: "600"
                  }}
                >
                  <Image
                    src={recipe.img}
                    size="large"
                    caption={recipe.title}
                    style={{
                      borderStyle: "groove ridge ridge groove",
                      borderRadius: "12px"
                    }}
                  />
                </Link>
                <Anchor
                  onClick={() => {
                    this.addLike(recipe.id);
                  }}
                  icon={<Favorite style={{ stroke: "white" }} />}
                  label={" " + recipe.likes + " likes"}
                />
              </Box>
            ))}
        </Columns>
      </Box>
    );
  }
}

export default RecipeList;
