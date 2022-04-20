import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


export default function AddressForm({ setPostData, postData }) {
  const Input = styled('input')({
    display: 'none',
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Post Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="title-name"
            variant="standard"
            defaultValue={postData.title}
            onChange={(e) => {
              postData.title = e.target.value;
              setPostData(postData);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete="description-name"
            variant="standard"
            defaultValue={postData.description}
            onChange={(e) => {
              postData.description = e.target.value;
              setPostData(postData);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="imageURL"
            name="imageURL"
            label="Image URL"
            fullWidth
            variant="standard"
            defaultValue={postData.imageUrl}
            onChange={(e) => {
              postData.imageUrl = e.target.value;
              setPostData(postData);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="pollQuestion"
            name="pollQuestion"
            label="Poll Question"
            fullWidth
            autoComplete="description-name"
            variant="standard"
            defaultValue={postData.polls[0].name}
            onChange={(e) => {
              postData.polls[0].name = e.target.value;
              setPostData(postData);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="option1"
            name="option1"
            label="Option1"
            fullWidth
            autoComplete="option1-name"
            variant="standard"
            defaultValue={postData.polls[0].options[0].name}
            onChange={(e) => {
              postData.polls[0].options[0].name = e.target.value;
              setPostData(postData);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="option2"
            name="option2"
            label="Option2"
            fullWidth
            autoComplete="option2-name"
            variant="standard"
            defaultValue={postData.polls[0].options[1].name}
            onChange={(e) => {
              postData.polls[0].options[1].name = e.target.value;
              setPostData(postData);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="option3"
            name="option3"
            label="Option3"
            fullWidth
            autoComplete="option3-name"
            variant="standard"
            defaultValue={postData.polls[0].options[2].name}
            onChange={(e) => {
              postData.polls[0].options[2].name = e.target.value;
              setPostData(postData);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="option4"
            name="option4"
            label="Option4"
            fullWidth
            autoComplete="option4-name"
            variant="standard"
            defaultValue={postData.polls[0].options[3].name}
            onChange={(e) => {
              postData.polls[0].options[3].name = e.target.value;
              setPostData(postData);
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
