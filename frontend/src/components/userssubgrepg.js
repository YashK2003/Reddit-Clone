import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";

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

const mystyle1 = {
  marginTop: "4%",
  marginLeft: "9%",
  height: "330px",
  color: "white",
  width: "300px",
  backgroundColor: "white",
  padding: "10px",
  fontFamily: "Arial",
  fontColor: "black",
  borderRadius: "35px",
};

export const getJwt = () => {
  return localStorage.getItem("access-token");
};

var listofpeeps = [];
var listofblocks = [];

class usersubgrepg extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
    };

  }

  componentDidMount() {

    
    const jwt = getJwt();
    if (!jwt) {
        this.props.history.push("/login");
      } else {
        
        // first extract the email of the current user
        axios
        .get("http://localhost:4000/auth", {
          headers: { authorization: `Bearer: ${jwt}` }
        })
        .then(res => {

          // NOW GIVE ANOTHER AXIOS REQUEST TO EXCESS THE DATA
          //..............................................................
          var url = window.location.pathname;
          url =   url.slice(0, -6);
          var id = url.substring(url.lastIndexOf('/') + 1);
          console.log(": -> " ,   id);

          const sendobj = {
            idtosend: id
          }
          axios
            .post("http://localhost:4000/data/showuserpage" , sendobj)
            .then(respe => {
              if (respe.data === "Invalid Credentials") {
                console.log("invalid");
            
              } else {
                // console.log(" -- > data in " , respe.data[0].BlockedPeople);

                
                // for (let i = 0; i < respe.data.length; i++) {
                  listofpeeps = (respe.data[0].People);
                  listofblocks = (respe.data[0].BlockedPeople);
                // }
                // console.log(typeof(listofpeeps));
                // console.log("here -> ",listofblocks.BlockedPeople);

                  this.setState({
                    userData: respe.data[0],  
                  });  
              }
            })
            .catch(err => {
              console.log(" ----------> here we got an error");
            });
          
        })
        .catch(err => {
          console.log("error here is -->  ", JSON.stringify(err));
          localStorage.removeItem("access-token");
          this.props.history.push("/login");
        });

        
      }
    console.log("listofblocks -> " , listofblocks);
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
        <div style={{display: "flex"}}>
        <div style={mystyle1}>
        <h2 style={{color: "Green" , marginLeft: "35%"}} > Users </h2>   
        {listofpeeps.map((course, index) => {
              return (
                <div key={index}>
                <h3 style={{color: "Black" , marginLeft: "10%"}}>{index+1}. {course} </h3>             
                </div>
                )
          })}
        </div>

        <div style={mystyle1}>
        <h2 style={{color: "Red" , marginLeft: "20%"}} > Blocked Users </h2>   
        {listofblocks.map((course, index) => {
              return (
                <div key={index}>
                <h3 style={{color: "Black" , marginLeft: "10%"}}>{index+1}. {course} </h3>             
                </div>
                )
          })}
        </div>
        </div>
        <Box mt={78}>
            <Copyright />
        </Box>
      
      </div>
    );
  }
}

export default withRouter(usersubgrepg);