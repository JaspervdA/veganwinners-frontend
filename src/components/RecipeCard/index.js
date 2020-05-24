import React from 'react';
import Box from "grommet/components/Box";
import Image from "grommet/components/Image";
import Anchor from "grommet/components/Anchor";
import Label from "grommet/components/Label";
import Cafeteria from "grommet/components/icons/base/Cafeteria";
import { Link } from "react-router-dom";

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

class RecipeCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      recipe: props.recipe
    };
  }

  componentWillReceiveProps({recipe}) {
    this.setState({...this.state,recipe})
  }

  render() {
    return (
    <Box
        key={this.state.recipe.id}
        align="center"
        justify="center"
        pad="small"
        margin="small"
        style={{
          backgroundColor: getColor(this.state.recipe.id),
          boxShadow: "7px 7px 5px #B0BEC5",
          borderColor: "#B0BEC5",
          borderRadius: "12px"
        }}
    >
        <Link
          to={{ pathname: `/recipe/${this.state.recipe.id}` }}
          style={{
            textDecoration: "none",
            color: "#FFFFFF",
            fontWeight: "600",
            position: "relative"
          }}
        >
          <Image
            full="full"
            src={this.state.recipe.img}
            size="large"
            style={{
              borderStyle: "groove ridge ridge groove",
              borderRadius: "12px",
              width:"100%", 
              height: "250px",
              objectFit: "cover" 
            }}
          />
          <Image
            src={this.state.recipe.vegan ? "/vegan_icon_final.png" : "/vega_icon_final.png"}
            size="small"
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              width: "20%",
              height: "auto"
            }}
          />
          <Box align="center"
            justify="center"
            pad="small"
            margin="small"
            style={{
              width:"100%", 
              height: "100px"
            }}>
              <Label align="center">{this.state.recipe.title}</Label>
          </Box>
        </Link>
        <Anchor
          icon={<Cafeteria style={{ stroke: "white" }} />}
          label={" " + this.state.recipe.type}
          path={{ path: `/recipe/${this.state.recipe.id}` }}
        />
    </Box>
    );
  }
}

export default RecipeCard;
