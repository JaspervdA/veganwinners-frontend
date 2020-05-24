import React from "react";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import MenuIcon from "grommet/components/icons/base/Menu";

class MenuBar extends React.Component {
  render() {
    return (
      <Header fixed={true} float={false} splash={false}>
        <Box
          flex={true}
          align="center"
          justify="end"
          direction="row"
          responsive={true}
        >
          <Menu
            responsive={true}
            align="center"
            justify="center"
            label="Menu"
            icon={<MenuIcon />}
            primary={false}
            dropAlign={{ right: "right", top: "bottom" }}
          >
            <Anchor path={"/"}>Terug naar alle recepten!</Anchor>
            <Anchor path={"/add"}>Recept toevoegen</Anchor>
            <Anchor path={"/about"}>Over Veganwinners</Anchor>
            <Anchor path={"/reaction"}>Geef jouw feedback!</Anchor>
          </Menu>
        </Box>
      </Header>
    );
  }
}

export default MenuBar;
