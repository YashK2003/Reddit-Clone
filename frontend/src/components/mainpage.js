import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from '@material-ui/core';
import axios from "axios";
import background from "./2007739.webp";
import { BiHome , BiLogIn , BiLogOut , BiArrowToRight, BiWindowOpen } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi2";

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

const mystylepara = {
  color: "primary", fontFamily: "Caveat" , fontSize: "100px" , margin: "30px",
  marginLeft: "350px"

};


export const getJwt = () => {
    return localStorage.getItem("access-token");
};
  
class Propg extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: {}
        };
        console.log("in the constructor");
        this.logout = this.logout.bind(this);
      }
        
      componentDidMount() {
        console.log("mounting start");
        const jwt = getJwt();
        function updateHistory(curr) {
          window.location.lasthash.push(window.location.hash);
          window.location.hash = curr;
      }
      
        if (!jwt) {
          this.props.history.push("/login");
        } else {
          // console.log("else", jwt);
          axios
            .get("http://localhost:4000/auth", {
              headers: { authorization: `Bearer: ${jwt}` }
            })
            .then(res => {
              console.log("yo", this.state);
    
              this.setState({
                userData: res.data
              });
              console.log("this is res.data --> ");
              console.log(res.data);
    
              axios
              .post("http://localhost:4000/data/yash", {
                
              })
              .then(resp => {
                console.log("data is --> ", typeof(resp.data));
                console.log("id", this.state.data.id);
                this.setState({
                  data: resp.data
                });
                console.log("this.state is " , (this.state));
              })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log("error here is -->  ", JSON.stringify(err));
              localStorage.removeItem("access-token");
              this.props.history.push("/login");
            });
          console.log("finally done with here");
        }
      }
    
      logout() {
        localStorage.removeItem("access-token");
        window.location.reload();
      }    

  render() {
    return(
      <div style={{ backgroundImage: `url(${background})` , backgroundSize: "100%" , backgroundRepeat: "no-repeat" }}  >
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

            <nav   style={{paddingLeft: "600px", color: "white" }}>
            <Link
              style={{paddingRight: "35px", paddingLeft: "10px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                href="/profile"
              >
                <HiUserCircle style={{fontSize: "40px" ,marginTop: "10px"}}/>
              </Link>

              <Button variant="outlined" color="white" style={{marginBottom: "25px",color: "white", borderColor: '#FFFFE8',}} onClick={() => { window.location.href = "/globalsubg" }}>
                All Subgreddits
              </Button>

              <Button variant="outlined" color="white" style={{marginBottom: "25px",color: "white",marginLeft: "20px" , borderColor: '#FFFFE8',}} onClick={() => { window.location.href = "/subg" }}>
                My Subgreddits
              </Button>

              <Button variant="outlined" color="white" style={{marginBottom: "25px",marginLeft: "20px" ,color: "white", borderColor: '#FFFFE8',}} onClick={() => { window.location.href = "/savedposts" }}>
                Saved Posts 
              </Button>
              
              <Button variant="outlined" color="white" style={{marginBottom: "25px",marginLeft: "20px",color: "white", borderColor: '#FFFFE8',}} onClick={this.logout}>
                Logout &nbsp;
                <BiLogOut style={{fontSize: "25px" }}/>
              </Button>
            </nav>   
          </Toolbar>
        </AppBar>
        <div style={{marginLeft: "600px"}} ><p style={mystylepara}>Welcome</p>
        <p style={mystylepara}>  	&nbsp;	&nbsp;&nbsp;to </p>
        <p style={mystylepara}> Greddit</p>
        </div>
        <Box style={{marginLeft: "600px"}} mt={20}>
            <Copyright />
        </Box>
      </div>
    );
  }
}

export default withRouter(Propg);