import React from "react";
import { Box, Columns, Image, Anchor } from "grommet";
import { Favorite } from "grommet-icons";
import { Link } from "react-router-dom";
import Spinning from "grommet/components/icons/Spinning";

function getColor(id) {
  let colors = ['#1565C0', '#FBC02D', '#FB8C00', '#880E4F', '#2E7D32', '#ef9a9a', '#26C6DA']
  // blauw, okergeel, oranje, paars, groen, roze, turqoise
  let randomnumber = Math.floor(Math.random() * (100))
  return colors[(id + randomnumber)%7]
}

class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      recipes: []
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
    fetch(`http://veganwinners.com/api/recipes/approved`)
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
              style={{ backgroundColor: getColor(recipe.id), boxShadow: "7px 7px 5px #B0BEC5", borderColor: "#B0BEC5", borderRadius: "12px"}}
            >
              <Link
                to={{ pathname: `/recipe/${recipe.id}` }}
                style={{ textDecoration: "none", color: '#FFFFFF', fontWeight: '600' }}
              >
                <Image
                  src={recipe.img}
                  size="large"
                  caption={recipe.title}
                  style={{ borderStyle: "groove ridge ridge groove", borderRadius: "12px"}}
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
    );
  }
}

export default RecipeList;
