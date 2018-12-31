import React from "react";
import { Footer as GrommetFooter } from "grommet";
import { Title, Box, Image, Anchor, Paragraph } from "grommet";
import { Github } from "grommet-icons";

export default () => (
  <GrommetFooter justify="between" align="center" size="large" pad="medium">
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
  </GrommetFooter>
);
