import * as React from 'react';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import 'reactjs-popup/dist/index.css';


const theme = createTheme();

const mystyle = {
  backgroundColor: "#d02a2a",
  marginBottom: "5px" 
};

// for google 
// *****************************************


export default function addpost() {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("here - > " , data.get('email'));
    
    
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            margintop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <br/>

          <Typography component="h1" variant="h5" style={{ color: 'Black' }} >
           Add POST
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Text"
                  name="email"
                  autoComplete="off"
                />
              </Grid>
              <br/><br/><br/><br/>              
            </Grid>
            <br/>
            <div style={{color: "red"}}>
            <Button
                margintop = "10px"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add post 
            </Button>
            <br/>
            </div>
            <br/>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}