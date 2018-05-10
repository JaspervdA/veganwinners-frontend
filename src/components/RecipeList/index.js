import React from 'react';
import { Box, Card, Columns } from 'grommet';
import { Link } from 'react-router-dom';
import Spinning from 'grommet/components/icons/Spinning';

class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      numRecipes: 10,
      recipes: []
    };
  }

  getRecipes(numRecipes) {
    fetch(`http://veganwinners.com/api/recipes/${numRecipes}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          recipes: data.data,
          isLoading: false
        })
      );
  }

  componentDidMount() {
    this.getRecipes(this.state.numRecipes);
  }

  render() {
    return (
      <Columns
        size="medium"
        justify="center"
        maxCount={2}
        style={{
          backgroundImage: `url( '/img/wildtextures-wooden-chopping-board-texture.jpg')`
        }}
      >
        {this.state.isLoading && <Spinning />}
        {!this.state.isLoading &&
          this.state.recipes.map(recipe => (
            <Box
              key={recipe.id}
              align="center"
              justify="center"
              pad={{ horizontal: 'medium', vertical: 'medium' }}
              margin="large"
              colorIndex="light-1"
            >
              <Link
                to={{ pathname: `/recipe/${recipe.id}` }}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  thumbnail={recipe.img}
                  heading={recipe.title}
                  contentPad="medium"
                  textSize="small"
                />
              </Link>
            </Box>
          ))}
      </Columns>
    );
  }
}

export default RecipeList;
