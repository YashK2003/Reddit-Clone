import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { BiLogIn , BiLogOut , BiArrowToRight } from "react-icons/bi";

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


class Homepg extends React.Component {
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

            <nav   style={{paddingLeft: "1110px", color: "white" }}>
            {/* <Link
              style={{paddingRight: "50px", paddingLeft: "0px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                // color="textPrimary"
                href="/register"
              >
              
              <BiArrowToRight style={{fontSize: "40px"}} />
              </Link> */}
              <Link
              style={{paddingRight: "0px", paddingLeft: "0px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                color="textPrimary"
                href="/login"
              >
              <BiLogIn style={{fontSize: "40px"}}/>
              </Link>
            </nav>   
          </Toolbar>
        </AppBar>
        <Box mt={78}>
            <Copyright />
        </Box>
      </div>
    );
  }
}

export default withRouter(Homepg);