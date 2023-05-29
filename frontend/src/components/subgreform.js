import * as React from 'react';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import { useState } from "react";

const theme = createTheme();

export default function Subgformsub() {
  

  const jwt = localStorage.getItem("access-token");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [banned, setBanned] = useState("");

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
    .get("http://localhost:4000/auth", {
      headers: { authorization: `Bearer: ${jwt}` }
    })
    .then(res => {
    console.log("in my addsubgrepage -> " , res.data);
    var myemil = res.data.email;
    var initpeople = [];
    var initposts = [];
    var blckpeeps = [];
    initpeople.push(myemil);
    console.log(initpeople);
    const detailsobj = {
      name: data.get('name'),
      description: data.get('desc'),
      tags: data.get('tags'),
      Bankeywords: data.get('bankey'),
      People: initpeople,
      Posts: initposts,
      Moderators: initpeople,
      BlockedPeople: blckpeeps,
    }

    console.log(detailsobj);
    if (
      detailsobj["name"] !== "" &&
      detailsobj["description"] !== "" &&
      detailsobj["tags"] !== ""  &&
      detailsobj["Bankeywords"] !== "" 
    ) {

      console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/subgreadd", detailsobj)
        
        .then(res => {
          console.log("added successfull");  
          window.alert("Subgreddit added successfully !!"); 
          (window.location.href = "/subg")
        })
        
        .catch(err => {
          console.log("not got added"); 
          window.alert("Unable to  add  !!"); 

        });

    } else {
      console.log("all fields not filled ");
      window.alert("All fields are mandatory !!");
    } 
  
  })
  .catch(err => {
    console.log("error here is -->  ", JSON.stringify(err));
    localStorage.removeItem("access-token");
    this.props.history.push("/login");
  });
    
  };

  const validate = () => {

    var checkname = false
    var checkdesc = false
    var checktags = false
    var checkbanned = false
    
    //************************ check name ************************ 
    if(name.length > 0){
      checkname = true;
    }
    //************************ check name ************************ 
    
    //************************ check desc ************************ 
    if(desc.length > 0){
      checkdesc = true;
    }
    //************************ check desc ************************ 
   
    //************************ check tags ************************ 
    if(tags.length > 0){
      checktags = true;
    }
    //************************ check tags ************************ 

    //************************ check banned ************************ 
    if(banned.length > 0){
      checkbanned = true;
    }
    //************************ check  banned ************************ 

    
    // console.log("fname - >  " , checkname)
    // console.log("lname - >  " , checkdesc)
    // console.log("uname - >  " , checktags)
    // console.log("email - >  " , checkbanned)

    // return all checkpoints
    return (checkname & checkdesc & checktags & checkbanned) 
      
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
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}  
                />
              </Grid>
              <br/><br/><br/><br/>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="desc"
                  label="Description"
                  id="desc"
                  autoComplete="off"
                  onChange={(e) => setDesc(e.target.value)}  
                />
              </Grid >
            <br/><br/><br/><br/>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="Tags"
                name="tags"
                fullWidth
                multiline
                maxRows={4}
                onChange={(e) => setTags(e.target.value)}  
              />
              </Grid >
            </Grid>
            <br/>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="Banned Keyword"
                name="bankey"
                fullWidth
                multiline
                maxRows={4}
                onChange={(e) => setBanned(e.target.value)}  
              />
              </Grid >
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
              Add  
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