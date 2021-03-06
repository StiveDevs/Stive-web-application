import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Postcard from '../postcard/Postcard'

export default function Review({ post }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Post Details
      </Typography>
      <Grid container spacing={2}>
        <Postcard post={post} />
      </Grid>
    </React.Fragment>
  );
}
