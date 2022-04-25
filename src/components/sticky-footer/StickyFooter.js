import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';


export default function StickyFooter() {
  return (
    <footer style={{ color: "gray", bottom: 20 }}>
      <Container  sx={{ mt: 10, align:"center",height: 40}} >
        <center>© 2022 Stive All rights reserved. </center>

      </Container>
    </footer>
  );
}
