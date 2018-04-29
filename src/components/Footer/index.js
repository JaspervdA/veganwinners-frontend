import React from 'react';
import { Footer as GrommetFooter } from 'grommet';
import { Title, Box, Image, Anchor } from 'grommet';
import { Github } from 'grommet-icons';

export default () => (
  <GrommetFooter justify='between' align='center' size='large'>
    <Title>
      <Image src='/img/vegan_icon.png' size='thumb'/>
      Veganwinners
    </Title>
    <Box direction='row'
    align='center'
    pad={{"between": "medium"}}>
      <Anchor icon={<Github />} label='Frontend' primary={true} href='https://github.com/JaspervdA/veganwinners-frontend'/>
      <Anchor icon={<Github />} label='Backend' primary={true} href='https://github.com/missEnergy/veganwinners-backend'/>
    </Box>
  </GrommetFooter>
)