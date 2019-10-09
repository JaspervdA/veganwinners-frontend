import React from 'react';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';

class About extends React.Component {
  render() {
    return (
      <Box align="center" pad="medium">
        <Headline size="small">
          <i>Be the change you wish to see in the world...</i>
        </Headline>
        <Paragraph size="medium">
          Deze website is bedoeld voor iedereen die ook houdt van lekker eten,
          maar dan wel vega en vegan. Sinds de zomer van 2016 verzamelen wij, Jasper en
          Ellissa, gemakkelijke en toegankelijke recepten zonder vlees en vaak
          ook zonder zuivel. Zo proberen wij onze milieu-impact een klein beetje
          te reduceren. Sinds 2018 hebben we deze website in het leven geroepen
          voor onze familie, vrienden en kennissen. De intentie is dat het als
          een platform dient om vegetarische en veganistische recepten met elkaar te delen.
          Veel plezier met koken en eet smakelijk!
        </Paragraph>
        <Image src="https://res.cloudinary.com/dsu60ie3p/image/upload/v1529655323/dan-gold-298710-unsplash-c_scale_w_820.jpg" size="large" />
        <Paragraph size="medium">
          {' '}
          Voor vragen en op- of aanmerkingen kun je ons{' '}
          <a href="mailto:ellissa@veganwinners.com">mailen</a>. Als je op de
          mailing lijst wilt voor recepten updates, mail ons dan ook!<br />
          <br />
          Verder is onze website volledig open source. Wij staan open voor
          feedback en feature request!
        </Paragraph>
      </Box>
    );
  }
}

export default About;
