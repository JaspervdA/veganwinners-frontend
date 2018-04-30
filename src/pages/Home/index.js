import React from 'react';
import WelcomeMessage from '../../components/WelcomeMessage';
import RecipeList from '../../components/RecipeList';
import { Box, Headline } from 'grommet';

class Home extends React.Component {
  render() {
    return (
      <Box>
        <WelcomeMessage />
        <Headline align='center' strong={true} colorIndex='accent-3'>
          Welkom op Veganwinners
        </Headline>
        <RecipeList />
      </Box>
    )
  }
}

export default Home
