import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Box, Menu, Anchor } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';

class MenuBar extends React.Component{
   render() {
     console.log(this)
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
            <Link to='/'>
              <Anchor className='active'>
                Terug naar alle recepten!
              </Anchor>
            </Link>
            <Link to='/about'>
            <Anchor>
              Over de site
            </Anchor>
            </Link>
          </Menu>
        </Box>
      </Header>
     )
   }
}

export default MenuBar
