import React from 'react';
import { Box, Headline, Image, Paragraph } from 'grommet';

class About extends React.Component{
   render() {
     return (
       <Box align="center" pad="medium">
         <Headline size="small">
             <i>Be the change you wish to see in the world...</i>
         </Headline>
         <Paragraph size="medium">
           Deze website is bedoeld voor iedereen die ook houdt van lekker eten, maar dan wel vega en vegan. Sinds 2 jaar verzamelen wij, Jasper en Ellissa, gemakkelijke en toegankelijke recepten zonder vlees en vaak ook zonder zuivel. Zo proberen wij onze milieu-impact een klein beetje te reduceren. Op deze website vind je nu een kleine selectie van onze winners. Veel plezier met koken en eet smakelijk!
         </Paragraph>
         <Image src='/img/vegan-vegetables-freshhh.jpg' size="large"/>
         <Paragraph size="medium"> Voor vragen en op- of aanmerkingen kun je ons <a href="mailto:ellissa@veganwinners.com">mailen</a>.<br/><br/>
           Verder is onze website volledig open source. Wij staan open voor feedback en feature request!
         </Paragraph>
       </Box>
     )
   }
}

export default About
