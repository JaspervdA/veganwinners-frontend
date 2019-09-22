import React from "react";
import { Box, Columns, Image, Anchor, TextInput, Select } from "grommet";
import { Cafeteria } from "grommet-icons";
import { Link } from "react-router-dom";
import Spinning from "grommet/components/icons/Spinning";
import {recipeTypes} from "./RecipeTypes";

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
      search: '',
      type: ''
    };
  }

  getRecipes() {
    let searchField = this.state.search.trim() === '' ? '*' : this.state.search 
    let typeField = this.state.type === '' ? 'Alle' : this.state.type 
    fetch(`http://veganwinners.com/api/recipes/approved/${searchField}/typed/${typeField}`)
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
          <Box size="medium">
            <TextInput
              placeHolder='Zoek op naam of ingrediënt'
              suggestions={['tomaat', 'aubergine', 'comfort bowl', 'mexi']}
              onSelect={async e => {await this.setState({ search: e.suggestion }); this.getRecipes()}}
              value={this.state.search}
              onDOMChange={async e => {await this.setState({ search: e.target.value }); this.getRecipes()}}
            />
          </Box>
          <Box size="xsmall"/>
          <Box size="medium">
              <Select placeHolder='Wat voor soort gerecht zoek je?'
              inline={false}
              multiple={false}
              options={["Alle"].concat(recipeTypes)}
              value={this.state.type}
              onChange={async e => {await this.setState({ type: e.value }); this.getRecipes()}} 
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
                  icon={<Cafeteria style={{ stroke: "white" }} />}
                  label={" " + recipe.type}
                  path={{path: `/recipe/${recipe.id}`}}
                />
              </Box>
            ))}
        </Columns>
      </Box>
    );
  }
}

export default RecipeList;
