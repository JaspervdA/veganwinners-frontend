import React from 'react';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';

class Reaction extends React.Component {
  render() {
    return (
      <Box align="center" pad="medium">
        <Headline size="small">
          <i>Wat denk jij? Laat het ons weten!</i>
        </Headline>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSepbqgbs9se7af7bmmuYSs2rM1UtS7DYkKd2Lcwuuq8JzWNNA/viewform?embedded=true" width="100%" height="700" frameborder="0" marginheight="0" marginwidth="0">Laden…</iframe>
      </Box>
    );
  }
}

export default Reaction;
