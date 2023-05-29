import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logform from './loginform';
import { BiHome , BiLogIn , BiLogOut , BiArrowToRight } from "react-icons/bi";

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
const mystyle1 = {
  marginLeft: "200px",
  marginTop: "30px",
  height: "530px",
  color: "white",
  width: "500px",
  backgroundColor: "#CD0404",
  padding: "10px",
  fontFamily: "Arial",

};

const mystyle2 = {
  height: "530px",
  marginTop: "30px",
  color: "white",
  width: "500px",
  backgroundColor: "#FF9F9F",
  padding: "10px",
  fontFamily: "Arial",
};

const mystyle3 = {
  color: "white",
  padding: "10px",
  fontFamily: "Arial",
  display: "flex",
  flexWrap: "wrap"
};

export const getJwt = () => {
  return localStorage.getItem("access-token");
};


class loginpg extends React.Component {

  componentDidMount() {
    console.log("mounting start");
    const jwt = getJwt();

    if (jwt) {
      this.props.history.push("/main");
    } else {
      this.props.history.push("/login");
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

            <nav   style={{paddingLeft: "1130px", color: "white" }}>
            <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana",color: "white" }}
                variant="button"
                color="textPrimary"
                href="/"
              >
                <BiHome style={{fontSize: "35px"}}/>
              </Link>
              <Link
              style={{paddingRight: "15px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white"}}
                variant="button"
                color="textPrimary"
                href="/register"
              >
                <BiArrowToRight style={{fontSize: "35px"}}/>
              </Link>
            </nav>
            
        
          </Toolbar>
        </AppBar>
        <div style={mystyle3}>
        
        <div style={mystyle1} ></div>
        <div style={mystyle2} > <Logform /> </div>
        </div>
        
        <Box mt={5}>
            <Copyright />
        </Box>
      </div>
    );
  }
}

export default withRouter(loginpg);

