import React from 'react'
import Section from 'grommet/components/Article'
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image'

class MainContent extends React.Component {
   render() {
     return (
       <Section pad='large'
         justify='center'
         align='center'
         colorIndex='white'>
         <Hero background={<Image src='/img/vegan-vegetables-freshhh.jpg'
          fit='cover'
          full={true} />}
          backgroundColorIndex='dark'
          size='large' />
       </Section>
     )
   }
}

export default MainContent
