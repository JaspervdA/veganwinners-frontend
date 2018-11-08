import React from "react";
import { Box, Columns, Image } from "grommet";
import { Link } from "react-router-dom";
import Spinning from "grommet/components/icons/Spinning";

var randomnumber = Math.floor(Math.random() * (100));

function getColor(id) {
  let colors = ['#FDD835', '#f44336', '#8BC34A', '#FF9100', '#BA68C8']
  return colors[(id + randomnumber)%5]
}

class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      recipes: []
    };
  }

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
              style={{backgroundColor: getColor(recipe.id)}}
            >
              <Link
                to={{ pathname: `/recipe/${recipe.id}` }}
                style={{ textDecoration: "none" }}
              >
                <Image
                  src={recipe.img}
                  size="large"
                  caption={recipe.title}
                />
              </Link>
            </Box>
          ))}
      </Columns>
    );
  }
}

export default RecipeList;
