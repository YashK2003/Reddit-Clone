import * as React from 'react';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import { useState } from "react";

const theme = createTheme();

const mystyle = {
  backgroundColor: "#d02a2a",
  marginBottom: "5px" 
};

export default function SignUp() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [uname, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [cno, setCno] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const detailsobj = {
      email: data.get('email'),
      password: data.get('password'),
      fname: data.get('firstName'),
      Lname: data.get('lastName'),
      Uname: data.get('username'),
      age: data.get('age'),
      ctnum: data.get('contact') 
    }
    console.log(detailsobj);

    if (
      detailsobj["email"] !== "" &&
      detailsobj["password"] !== "" &&
      detailsobj["Lname"] !== ""  &&
      detailsobj["fname"] !== "" &&
      detailsobj["Uname"] !== "" &&
      detailsobj["age"] !== "" &&
      detailsobj["ctnum"] !== "" 
    ) {

      console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/registeradd", detailsobj)
        
        .then(res => {

          if(res.data.data == "Exists"){
            window.alert("Email already exists !!"); 
          }else{
            window.alert("User registered successful !!"); 
          (window.location.href = "/login")
          }
          // console.log("added successfull" , res.data.data);  
          // window.alert("User registered successful !!"); 
          // (window.location.href = "/login")
        })
        
        .catch(err => {
          console.log("not got added"); 
          window.alert("Unable to  register user !!"); 
        });


        
    } else {
      console.log("all fields not filled ");
      window.alert("All fields are mandatory !!");
    } 

  };

  const validate = () => {

    var checkfname = false
    var checklname = false
    var checkuname = false
    var checkemail = false
    var checkage = false
    var checkcno = false
    var checkpass = false
    
    //************************ check email ************************ 
    if(email.length != 0){
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email.match(validRegex)){
        checkemail = true;
      }
    }
    //************************ check email ************************ 
    //************************ check password ************************ 
    if(pass.length >= 8){
      checkpass = true;
    }
    //************************ check password ************************ 
   
    //************************ check first name ************************ 
    if(fname.length > 0){
      checkfname = true;
    }
    //************************ check first name ************************ 

    //************************ check last name ************************ 
    if(lname.length > 0){
      checklname = true;
    }
    //************************ check last name ************************ 

    //************************ check user name ************************ 
    if(uname.length > 0){
      checkuname = true;
    }
    //************************ check user name ************************ 

    //************************ check age ************************ 
    const num = Number(age)
    if(num > 0 && num < 150){
      checkage = true;
    }
    //************************ check age ************************ 

    //************************ check cno ************************ 
    if(cno.length == 10){
      var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      checkcno = re.test(cno);
    }
    //************************ check cno ************************ 

    // console.log("fname - >  " , checkfname)
    // console.log("lname - >  " , checklname)
    // console.log("uname - >  " , checkuname)
    // console.log("email - >  " , checkemail)
    // console.log("age - >  " , checkage)
    // console.log("cno - >  " , checkcno)
    // console.log("pass - >  " , checkpass)

    // return all checkpoints
    return (checkfname & checklname & checkuname & checkemail 
      &  checkage & checkcno & checkpass)
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
          <Avatar style={mystyle} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: 'Black' }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFName(e.target.value)}  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                  onChange={(e) => setLName(e.target.value)}  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="off"
                  onChange={(e) => setUName(e.target.value)}  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="off"
                  onChange={(e) => setAge(e.target.value)}  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Contact no."
                  name="contact"
                  autoComplete="off"
                  onChange={(e) => setCno(e.target.value)}  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPass(e.target.value)}  
                />
              </Grid >
            <br/>
              <Grid item xs={12}>
              
            <br/>
              </Grid>
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
              Sign Up
            </Button>
            <br/>
            </div>
            <br/>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" style={{ color: 'Black' }}>
                  Already have an Account?  Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}