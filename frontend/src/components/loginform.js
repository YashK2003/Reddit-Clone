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
import { useState } from "react";
// for google
import Login from './googlelogin';
import Logout from './googlelogout';

const theme = createTheme();

const mystyle = {
  backgroundColor: "#d02a2a",
  marginBottom: "5px" 
};

// for google 
// *****************************************


export default function Logform() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const detailsobj = {
      email: data.get('email'),
      password: data.get('password'),
    }
    console.log(detailsobj);

    if (
      detailsobj["email"] !== "" &&
      detailsobj["password"] !== "" 
    ) {
        console.log("all is well till now");
        console.log(detailsobj);
        axios
        .post("http://localhost:4000/data/logincheck", detailsobj)
        .then(res => {

            console.log("here i am in the login page with my data");
          if (res.data.data === "Invalid Credentials") {
            // console.log("invalid");
            window.alert("Invalid Credentials");
        
          } 
          else {
            console.log("valid");
            localStorage.setItem("access-token", res.data);
            (window.location.href = "/main")
    
          }
        })
        .catch(err => {
          console.log(" ----------> here we got an error");
        });
    } else {
      console.log("all fields not filled ");
      window.alert("All fields are mandatory !!");
    } 
  };
  

  const validate = () => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(fname.length == 0 || lname.length == 0){
      return false
    }

    var check1 = false;
    var check2 = false;

    if(fname.match(validRegex)){
      check1 = true;
    }

    if(lname.length >= 8){
      check2 = true;
    }
    return check2 & check1;
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
            <Avatar style={mystyle} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: 'Black' }} >
            Log in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={(e) => setFName(e.target.value)}
                />
              </Grid>
              <br/><br/><br/><br/>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setLName(e.target.value)}
                />
              </Grid >
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
              disabled={!validate()}
            >
              Login 
            </Button>
            <br/>
            </div>
            <br/>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an Account?  Sign up !!
                </Link>
              </Grid>
            </Grid>
            <div>
            <Login />
            <br />
            <Logout />
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}