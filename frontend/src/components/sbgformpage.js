import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Subgformsub from './subgreform';

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


const mystyle2 = {
  height: "530px",
  marginTop: "30px",
  // color: "white",
  width: "500px",
  backgroundColor: "#FF9F9F",
  padding: "10px",
  fontFamily: "Arial",
  marginLeft: "30%"
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


class sbgreformpg extends React.Component {

//   componentDidMount() {
//     console.log("mounting start");
//     // const jwt = getJwt();
//     // if (jwt) {
//     //   this.props.history.push("/main");
//     // } else {
//     //   this.props.history.push("/login");
//     // }
//   }

//   logout() {
//     localStorage.removeItem("access-token");
//     window.location.reload();
//   }  

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
            <Typography
             style={{color: 'White' , marginLeft: "480px"}}
              variant="h6"
              color="inherit"
              noWrap
            >
              Add a subgreddiit !!
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={mystyle3}>
        
        <div style={mystyle2} > <Subgformsub /> </div>
        </div>
        
        <Box mt={5}>
            <Copyright />
        </Box>
      </div>
    );
  }
}

export default withRouter(sbgreformpg);

