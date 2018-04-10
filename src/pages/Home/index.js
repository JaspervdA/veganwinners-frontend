import React from 'react';
import WelcomeMessage from '../../components/WelcomeMessage';
import RecipeList from '../../components/RecipeList';
import { Box } from 'grommet';

class Home extends React.Component {
  render() {
    return(
      <Box>
        <WelcomeMessage />
        <RecipeList />
      </Box>
    )
  }
}

export default Home
