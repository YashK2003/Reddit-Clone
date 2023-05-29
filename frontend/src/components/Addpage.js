import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import axios from "axios";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" target="blank" href="https://github.com/YashK2003">
        Yash Kawade
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class addpg extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      Image: "",
      Description: "",
      error: ""
    };

    console.log("In constructor" , this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {

    // console.log("event is " , event);
    // console.log("before -> " , this.state);
    
    // const { proname, value } = event.target;
    const proname = event.target.name;
    const value = event.target.value;
    console.log("proname is " , proname);
    console.log("value is " , value);
    this.setState({
      [proname]: value
    });

    // console.log("after -> " , this.state);
  }

  onSubmit(event) {
    // console.log("hi");

    event.preventDefault();

    const courseobj = {
      Name: this.state.Name,
      Image: this.state.Image,
      Description: this.state.Description,
    };

    if (
      courseobj["Name"] !== "" &&
      courseobj["Image"] !== "" &&
      courseobj["Description"] !== "" 
    ) {
      console.log("posting", courseobj);
      axios
        .post("http://localhost:4000/data/add", courseobj)
        
        .then(res => {
          this.setState({
            error: "Hero Added to list Successfully!",
            color: "green",
            Name: "",
            Image: "",
            Description: ""
          });
        })
        
        .catch(err => {
          // console.log("errored");
          this.setState({
            error: "Error: Cannot Add Hero",
            color: "red",
            Name: this.state.Name,
            Image: this.state.Image,
            Description: this.state.Description,
          });
        });

    } else {
      // console.log("****");

      this.setState({
        Name: this.state.Name,
        Image: this.state.Image,
        Description: this.state.Description,
        error: "All fields are Mandatory!",
        color: "red"
      });
    }
  }

  render() {
    return(
      <div>
        <AppBar
          position="static"
          color="default"
          style={{ background: '#f5ba13' }}
          elevation={0}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
            >
             My Marvel Superheroes
            </Typography>

            <nav   style={{paddingLeft: "800px" }}>
            <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                variant="button"
                color="textPrimary"
                href="/"
              >
                HOME
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                variant="button"
                color="textPrimary"
                href="/main"
              >
                COURSES
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                variant="button"
                color="textPrimary"
                href="/add"
              >
                ADD
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana" }}
                variant="button"
                color="textPrimary"
                href="/about"
              >
                ABOUT ME
              </Link>
            </nav>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography variant="h5">
              <br />
              <br />
              <center>
                <b >ADD A SUPERHERO</b>
              </center>
              <br />
              <br />
            </Typography>

            <form >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormLabel>
                    <b >Name of Hero:</b>
                    <br />
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Name"
                    name="Name"
                    autoComplete="Name"
                    onChange={this.handleChange}
                    value={this.state.Name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <br />
                  <FormLabel>
                    <b>Description of Hero:</b>
                    <br />
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Description"
                    id="Description"
                    autoComplete="Description"
                    onChange={this.handleChange}
                    value={this.state.Description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <br />
                  <FormLabel>
                    <b>Image URL: </b>
                    <br />
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Image"
                    id="Image"
                    autoComplete="Image"
                    onChange={this.handleChange}
                    value={this.state.Image}
                  />
                </Grid>
              </Grid>
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="default"
                onClick={this.onSubmit}
              >
                Submit
              </Button>
              <br />
              <br />
              <Grid container>
                <Grid item>
                  <p> {this.state.error} </p>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        <Box mt={5}>
            <Copyright />
        </Box>
      </div>
      
    );
  }
}

export default withRouter(addpg);