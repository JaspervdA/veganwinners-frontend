import React from 'react';
import { Header, Box, Menu, Anchor } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import { Link } from 'react-router-dom';

class MenuBar extends React.Component{
   render() {
     console.log(this.props.match)
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
                Home
                </Anchor>
              </Link>
            </Menu>
          </Box>
        </Header>
     )
   }
}

export default MenuBar
