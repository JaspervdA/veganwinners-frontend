import React from 'react';
import { Headline, Section } from 'grommet';

class About extends React.Component{
   render() {
     return (
       <div>
         <Section style={{padding:"20px"}}>
           <Headline>
             Welkom op Veganwinners
           </Headline>
           <Headline size="small">
             <i>Be the change you wish to see in the world...</i>
           </Headline>
           Deze website is bedoeld voor iedereen die ook houdt van lekker eten, maar dan wel vega en vegan. <br/><br/>
           Sinds 2 jaar verzamelen wij, Jasper en Ellissa, gemakkelijke en toegankelijke recepten zonder vlees en vaak ook zonder zuivel. Zo proberen wij onze milieu-impact een klein beetje te reduceren. <br/><br/>
           Hieronder vind je nu een kleine selectie van onze winners. Veel plezier met koken en eet smakelijk!
         </Section>
         <Section style={{padding:"20px"}}>
           <p> Voor vragen en op- of aanmerkingen kun je ons <a href="mailto:ellissa@veganwinners.com">mailen</a>.<br/><br/>
           Verder is onze website volledig open source. Je kunt onze <a href="https://github.com/JaspervdA/veganwinners-frontend">frontend</a> en <a href="https://github.com/missEnergy/veganwinners-backend/">backend</a> vinden op Github. Wij staan open voor feedback en feature request!</p>
         </Section>
       </div>
     )
   }
}

export default About
