import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from '@material-ui/core';
import axios from "axios";
import { Label } from 'semantic-ui-react'

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
  
const mystyle1 = {
  marginTop: "4%",
  marginLeft: "9%",
  // height: "330px",
  color: "white",
  width: "300px",
  backgroundColor: "white",
  padding: "10px",
  fontFamily: "Arial",
  fontColor: "black",
  borderRadius: "35px",
};


// FUNCTION TO REDIRECT TO THE SUBGRE WEBPAGE
function opensubgre(para){
  // console.log("in open subgreddit - > " , para.course._id);
  var linkfornext = "/subgre/" + `${para.course._id}`;
  console.log("my link is : " , linkfornext);
 window.location.href = linkfornext;

}

// FUNCTION TO DELETE THE SUBGREDDIT FROM THE LIST
function delsubgre(para){

  // para is the word we have to delete
  console.log("para is -> " , para.course._id);
  // DELETE THE SUBGREDDIT
  const detailsobj = {
    subgreid: para.course._id,
  }

  console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/delsubgre", detailsobj)
        .then(res => {
          // window.alert("Subgre Deleted successfully !!");
          // window.location.reload()
        })        
        .catch(err => {
          window.alert("Unable to delete the Subgree !!"); 
          window.location.reload()
          return;
        });

    // DELETE IT FROM EVERYWHERE
    // ************************************ DELETE FROM STATS ********************
    axios
      .post("http://localhost:4000/data/deletesubgredata", detailsobj)
      .then(res => {
        // window.alert("Subgre Deleted successfully !!");
        // window.location.reload()
      })        
      .catch(err => {
        window.alert("Unable to delete the Subgree !!"); 
        window.location.reload()
        return;
      });

    // ************************************ DELETE FROM STATS ********************.

    // ******************************** DELETE FROM SAVED POSTS ********************
    const detailsobj3 = {
      mainid: para.course._id,
    }
  
    console.log("posting to backend", detailsobj3);
        axios
          .post("http://localhost:4000/data/delwhensubgredel ", detailsobj3)
          .then(res => {
            // window.alert("Left successfully !!");
            // window.location.reload()
          })        
          .catch(err => {
            // window.alert("Unable to leave successfully !!"); 
            // window.location.reload()
          });
  

    // ******************************** DELETE FROM SAVED POSTS ********************

    window.alert("Subgre Deleted successfully !!");
    window.location.reload()
}


var mysubgres = [];

class subgrepg extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userData: {},
        };
        console.log("in the constructor");
        this.logout = this.logout.bind(this);
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
              const sendobj = {
                email: res.data.email
              }
              axios
                .post("http://localhost:4000/data/getsubgredata" , sendobj)
                .then(respe => {
                  if (respe.data === "Invalid Credentials") {
                    console.log("invalid");
                
                  } else {
                    console.log(" -- > data in " , respe.data);

                    
                    for (let i = 0; i < respe.data.length; i++) {
                      mysubgres.push(respe.data[i]);
                    }
                    console.log(typeof(mysubgres));
                    console.log((mysubgres));

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
        }
      
        logout() {
          localStorage.removeItem("access-token");
          window.location.reload();
        }    
    
  render() {
    return(
      <div style={{ background: '#F55050'}}>
        <AppBar
          position="static"
          color="default"
          style={{ background: '#CD0404' }}
          elevation={0}
        >
          <Toolbar>
            <Typography 
            style={{color: 'white'}}
              variant="h5"
              color="inherit"
              noWrap
            >
              GREDDIIT
            </Typography>

            <nav   style={{paddingLeft: "1090px", color: "white" }}>
            <Link
              style={{paddingRight: "25px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                href="/main"
              >
                MAIN PAGE
              </Link>
              <Button variant="outlined" style={{color: "white", borderColor: '#FFFFE8',}} onClick={this.logout}>
                Logout
              </Button>
            </nav>   
          </Toolbar>
        </AppBar>
        <div style={{display: "flex"}}>
        <div style={{marginTop: "50px" , marginLeft: "60px"}}>
        <Button onClick={() => { window.location.href = "/subgaddform" }}  style = {{fontSize: "20px" , fontFamily: "Calibri" ,marginLeft: "280%", backgroundColor: "#E8D2A6" , width: "200px" , height: "50px" }}>
        {/* <Link href="/subgaddform" variant="body1" > */}
        ADD SUBGREDDIIT
        {/* </Link> */}
      </Button>
      </div>
        </div>
        <div style={{display: "flex" ,  flexWrap: "wrap"}}>
        {mysubgres.map((course, index) => {
              return (
                <div style={mystyle1} key={index}>
                <h2 style={{color: "Black" , marginLeft: "10px"}} > {index + 1} </h2>
                {/*  Number of people in the Sub Greddiit */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}> No. of People:    {course.People.length} </Label>
                {/* Number of posts posted in the Sub Greddiit until now */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}> No. of Posts:    {course.Posts.length} </Label>
                {/* Name */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}> Name:    {course.Name} </Label>
                {/* Description */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}> Description:    {course.Description} </Label>
                {/* Banned Keyword */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}>  Banned Keyword:    {course.Bannedkeywords} </Label>
                <Button onClick={() => { delsubgre({course}) }} style={{color: "Red",marginLeft: "15%", marginTop: "15px",  fontSize: "14px" }} variant="outlined"> Delete </Button>
                <Button onClick={() => { opensubgre({course}) }} style={{color: "Red",marginLeft: "12%", marginTop: "15px",  fontSize: "14px" }} variant="outlined"> Open </Button>
                </div>
                )
          })}
        </div>
        <Box mt={14}>
            <Copyright />
        </Box>
      </div>
    );
  }
}

export default withRouter(subgrepg);