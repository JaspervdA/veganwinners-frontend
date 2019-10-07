import React from "react";
import Footer from "grommet/components/Footer";
import Title from "grommet/components/Title";
import Box from "grommet/components/Box";
import Image from "grommet/components/Image";
import Anchor from "grommet/components/Anchor";
import Paragraph from "grommet/components/Paragraph";

import { Github } from "grommet-icons";

export default () => (
  <Footer justify="between" align="center" size="large" pad="medium">
    <Title>
      <Image src="/img/veganwinners.svg" size="small" />
    </Title>
    <Box direction="row" align="center" pad={{ between: "medium" }}>
      <Paragraph margin="none">
        <Anchor href="mailto:ellissa@veganwinners.com">Contact</Anchor>
      </Paragraph>
      <Anchor
        icon={<Github />}
        label=" Frontend"
        primary={true}
        href="https://github.com/JaspervdA/veganwinners-frontend"
      />
      <Anchor
        icon={<Github />}
        label=" Backend"
        primary={true}
        href="https://github.com/missEnergy/veganwinners-backend"
      />
    </Box>
  </Footer>
);
