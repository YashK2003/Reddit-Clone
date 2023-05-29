import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import Linegraph from "./bargraph"
import Linegraph2 from "./bargraph2"
import Linegraph3 from "./bargraph3"
import Linegraph4 from "./bargraph4"

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

export const getJwt = () => {
  return localStorage.getItem("access-token");
};

class statsubgrepg extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      mypostarray: [],
    };
    console.log("in the constructor");
    this.logout = this.logout.bind(this);
  }
    
  componentDidMount() {
    const jwt = getJwt();
    if (!jwt) {
        this.props.history.push("/login");
      } else {
        
      }
    }
  
    logout() {
      localStorage.removeItem("access-token");
      window.location.reload();
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
                href="./users"
              >
                Users
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                color="textPrimary"
                href="./joinreq"
              >
                Joining Requests Page
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                color="textPrimary"
                href="./stats"
              >
                Stats
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                color="textPrimary"
                href="./report"
              >
                Reported Page
              </Link>
            </nav>   
          </Toolbar>
        </AppBar>

        {/* <h1> MY STATSUBGREPAGE </h1> */}
        <div style={{display: "flex" ,flexWrap: "wrap"}}>
        <div style={{ margin: "30px" ,height: "340px" , width: "600px" , backgroundColor: "white", borderRadius: "35px"}}>
        <Linegraph />
        </div>
        <div style={{ margin: "30px" ,height: "340px" , width: "600px" , backgroundColor: "white",
        borderRadius: "35px"}}> 
        <Linegraph2 />
        </div>
        <div style={{ margin: "30px" ,height: "340px" , width: "600px" , backgroundColor: "white",
        borderRadius: "35px"}}> 
        <Linegraph3 />
        </div>
        <div style={{ margin: "30px" ,height: "340px" , width: "600px" , backgroundColor: "white",
        borderRadius: "35px"}}> 
        <Linegraph4 />
        </div>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
      </div>
    );
  }
}

export default withRouter(statsubgrepg);