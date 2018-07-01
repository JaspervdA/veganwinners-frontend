import React from 'react';
import WelcomeMessage from '../../components/WelcomeMessage';
import RecipeList from '../../components/RecipeList';
import { Box, Headline, Image } from 'grommet';

class Home extends React.Component {
  render() {
    return (
      <Box pad="medium">
        <WelcomeMessage />
        <Headline align="center" strong={true} colorIndex="accent-3">
          <Image src='/img/veganwinners.svg' size='medium'/>
        </Headline>
        <RecipeList />
      </Box>
    );
  }
}

export default Home;
