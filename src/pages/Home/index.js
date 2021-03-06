import React from "react";
import WelcomeMessage from "../../components/WelcomeMessage";
import RecipeList from "../../components/RecipeList";
import Box from "grommet/components/Box";
import Headline from "grommet/components/Headline";
import Image from "grommet/components/Image";

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
