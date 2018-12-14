import React from "react";
import WelcomeMessage from "../../components/WelcomeMessage";
import RecipeList from "../../components/RecipeList";
import { Box, Headline, Image } from "grommet";

class Home extends React.Component {
  render() {
    return (
      <Box responsive="true">
        <WelcomeMessage />
        <Box pad="medium">
          <Headline align="center" strong={true} colorIndex="accent-3">
            <Image src="/img/veganwinners.svg" size="medium" />
          </Headline>
        </Box>
        <RecipeList />
      </Box>
    );
  }
}

export default Home;
