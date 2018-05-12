import React from 'react';
import { Box } from 'grommet';

const DuoRow = props => {
  return (
    <Box size="auto" direction="row" align="center" justify="start" pad="small">
      <Box size="medium">{props.left}</Box>
      <Box>{props.right}</Box>
    </Box>
  );
};

export default DuoRow;
