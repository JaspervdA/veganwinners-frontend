import React from 'react'
import {Header, Box, Menu, Anchor} from 'grommet';
import {Menu as MenuIcon} from 'grommet-icons';

class MenuBar extends React.Component{
   render() {
     return (
        <Header fixed={true}
          float={false}
          splash={false}>
          <Box flex={true}
            justify='end'
            direction='row'
            responsive={true}>
            <Menu responsive={true}
              icon={<MenuIcon />}
              primary={false}
              dropAlign={{'left':'right', 'top':'bottom'}}
              size={'medium'}
              >
              <Anchor href='#' className='active'>
                Home
              </Anchor>
              <Anchor href='#'>
                Add Recipe
              </Anchor>
              <Anchor href='#'>
                Login
              </Anchor>
            </Menu>
          </Box>
        </Header>
     )
   }
}

export default MenuBar
