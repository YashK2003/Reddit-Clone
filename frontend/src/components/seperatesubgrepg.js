import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useParams } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link  target="blank" href="https://github.com/YashK2003">
        Yash Kawade
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

var temp1 = "";
var temp2 = "";
var temp3 = "";
var temp4 = "";

class seperatesubgrepg extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
    };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event){
    if(event.keyCode === 85) {
      console.log("detected -> u : " ,temp1);
      window.location.href = temp1;
    }

    if(event.keyCode === 82) {
      console.log("detected -> r : " ,temp4);
      window.location.href = temp4;
    }

    if(event.keyCode === 83) {
      console.log("detected -> s : " ,temp3);
      window.location.href = temp3;
    }

    if(event.keyCode === 74) {
      console.log("detected -> j : " ,temp2);
      window.location.href = temp2;
    }
  }


  componentDidMount() {
    var url = window.location.pathname;
      console.log("id is : " , url);

    temp1 = url + "/users";
    temp2 = url + "/joinreq";
    temp3 = url + "/stats";
    temp4 = url + "/report";

    this.setState({
      userData: {temp1 , temp2 , temp3 , temp4}
    });

    // console.log("temp1 is : " , temp1);
    // console.log("temp2 is : " , temp2);
    // console.log("temp3 is : " , temp3);
    // console.log("temp4 is : " , temp4);   
    document.addEventListener("keydown", this.onKeyPress, false); 
  }


 
  render() {
    return(
      <div style={{ background: '#F55050' }}>
        <AppBar
          position="static"
          color="default"
          style={{ background: '#CD0404' }}
          elevation={0}
        >
          <Toolbar>
            <Typography 
            style={{color: 'White'}}
              variant="h5"
              color="inherit"
              noWrap
            >
              GREDDIIT
            </Typography>

            <nav   style={{paddingLeft: "770px", color: "white" }}>
            <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                // color="textPrimary"
                href = {temp1}
              >
                Users
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                color="textPrimary"
                href={temp2}
              >
                Joining Requests Page
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                color="textPrimary"
                href={temp3}
              >
                Stats
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                color="textPrimary"
                href={temp4}
              >
                Reported Page
              </Link>
            </nav>   
          </Toolbar>
        </AppBar>
        <h2> Press U to goto Users page </h2>
        <h2> Press J to goto Joining Requests page </h2>
        <h2> Press S to goto Stats page </h2>
        <h2> Press R to goto Reported Page </h2>

        <Box mt={78}>
            <Copyright />
        </Box>
      </div>
    );
  }
}

export default withRouter(seperatesubgrepg);