import React from "react";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Columns from "grommet/components/Columns";
import Image from "grommet/components/Image";
import Anchor from "grommet/components/Anchor";
import TextInput from "grommet/components/TextInput";
import Select from "grommet/components/Select";
import Paragraph from "grommet/components/Paragraph";
import Cafeteria from "grommet/components/icons/base/Cafeteria";
import CaretBack from 'grommet/components/icons/base/CaretBack';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import { Link } from "react-router-dom";
import Spinning from "grommet/components/icons/Spinning";
import { recipeTypes } from "./RecipeTypes";

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
  return colors[(id) % 7];
}

class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      recipes: [],
      search: '',
      type: '',
      page: 1
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
          isLoading: false,
          page: 1
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
            <Select placeHolder='optioneel: soort gerecht'
              inline={false}
              multiple={false}
              options={["Alle"].concat(recipeTypes)}
              value={this.state.type}
              onChange={async e => { await this.setState({ type: e.value })}}
            />
          </Box>
          <Box size="xsmall" />
          <Box size="medium">
            <TextInput autoFocus
              placeHolder='optioneel: vrij zoeken'
              value={this.state.search}
              onDOMChange={async e => { await this.setState({ search: e.target.value }) }}
              onKeyPress={event => {
                if (event.key === 'Enter') { 
                  this.getRecipes()
                }
              }}
            />
          </Box>
        </Box>
        <Box
          size="auto"
          direction="row"
          align="center"
          justify="center"
          pad="small"
        >
          <Button
            label="Zoeken"
            primary={true}
            onClick={() => this.getRecipes()}
          />
        </Box>
        <Box direction="row"
          align="center"
          justify="center">
          <Box direction="row"
            align="center"
            justify="center"
            style={{
              flexDirection: "row"
            }}>
            <Image
              src={"/vegan_icon_final.png"}
              size="small"
              style={{
                width: "60",
                height: "auto"
              }}
            />
            <Paragraph>= veganistisch</Paragraph>
          </Box>
          <Box direction="row"
            align="center"
            justify="center"
            style={{
              flexDirection: "row"
            }}>
            <Image
              src={"/vega_icon_final.png"}
              size="xsmall"
              style={{
                width: "60",
                height: "auto"
              }}
            />
            <Paragraph>= vegetarisch</Paragraph>
          </Box>
        </Box>
        <Box
          size="auto"
          direction="column"
          align="center"
          justify="center"
          pad="small"
        >
          <Anchor
            icon={<CaretBack/>}
            label="....... Vorige"
            primary={true}
            onClick={() => { 
              if (this.state.page > 1) { 
                this.setState({ page: this.state.page - 1 })
              } 
            }
          }
          />
          <Anchor
            icon={<CaretNext/>}
            label=".. Volgende"
            primary={true}
            onClick={() => { 
              if (this.state.recipes.length / 9 > this.state.page) { 
                this.setState({ page: this.state.page + 1 })
              } 
            }
          }
          />
        </Box>
        <Columns size="medium" justify="center" maxCount={3}>
          {this.state.isLoading && <Spinning />}
          {!this.state.isLoading && this.state.recipes.length == 0 && 
              <Box
                direction="row"
                align="center"
                justify="center"
                pad="large"
              >
                <Paragraph><i>Geen resultaten, zoek iets anders...</i></Paragraph>
              </Box> }
          {!this.state.isLoading &&
            this.state.recipes.slice((this.state.page - 1) * 9, this.state.page * 9).map(recipe => (
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
                    fontWeight: "600",
                    position: "relative"
                  }}
                >

                  <Image
                    full="full"
                    src={recipe.img}
                    size="large"
                    caption={recipe.title}
                    style={{
                      borderStyle: "groove ridge ridge groove",
                      borderRadius: "12px"
                    }}
                  />
                  <Image
                    src={recipe.vegan ? "/vegan_icon_final.png" : "/vega_icon_final.png"}
                    size="small"
                    style={{
                      position: "absolute",
                      left: 10,
                      top: 10,
                      width: "20%",
                      height: "auto"
                    }}
                  />
                </Link>
                <Anchor
                  icon={<Cafeteria style={{ stroke: "white" }} />}
                  label={" " + recipe.type}
                  path={{ path: `/recipe/${recipe.id}` }}
                />
              </Box>
            ))}
        </Columns>
        <Box
          size="auto"
          direction="column"
          align="center"
          justify="center"
          pad="small"
        >
          <Anchor
            icon={<CaretBack/>}
            label="....... Vorige"
            primary={true}
            onClick={() => { 
              if (this.state.page > 1) { 
                this.setState({ page: this.state.page - 1 })
              } 
              window.scrollTo(0, 450);
            }
          }
          />
          <Anchor
            icon={<CaretNext/>}
            label=".. Volgende"
            primary={true}
            onClick={() => { 
              if (this.state.recipes.length / 9 > this.state.page) { 
                this.setState({ page: this.state.page + 1 })
              } 
              window.scrollTo(0, 450);
            }
          }
          />
        </Box>
      </Box>
    );
  }
}

export default RecipeList;
