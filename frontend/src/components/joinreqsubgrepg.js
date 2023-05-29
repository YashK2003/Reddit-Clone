import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import { Label } from 'semantic-ui-react'
import { Button } from '@material-ui/core';

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

// list to display the requeted users
var requsers = [];  
var todisplay = [];
var peoplearray = [];

// function to remove an element from an array
function arrayRemove(arr, value) {
  return arr.filter(function(temp){
      return temp !== value;
  });
}

// FUNCTION TO ACCEPT THE USER
function acceptuser(para){
  // console.log("in accept user -> ",peoplearray);
  // extract the id of the subgreddit to send the data to

  // console.log("before reqarr - >  " , requsers);
  // console.log("before peepsarr - >  " , peoplearray);

  var url = window.location.pathname;
  url =   url.slice(0, -8);
  var id = url.substring(url.lastIndexOf('/') + 1);
  // console.log("iiii "  , id);
  var result = arrayRemove(requsers, para.course.email);
  var temparrpeeps = peoplearray;
  temparrpeeps.push(para.course.email);
  const detailsobj = {
    peoplearray: temparrpeeps,
    userarr: result,
    subgreid : id
  }

  // ***************************** FOR STATS REPORT **************************
  const date1 = new Date();
  let day1 = date1.getDate();
  let month1 = date1.getMonth() + 1;
  let year1 = date1.getFullYear();

  let currentDate = `${day1}-${month1}-${year1}`;
  const obj = {
    datetoday: currentDate,
    sbid: id
  }

  console.log("posting to backend", obj);
  axios
  .post("http://localhost:4000/data/checkdateexists", obj)
  .then(res => {
    // console.log("posting to backend", detailsobj);
        axios
        .post("http://localhost:4000/data/incrementusers", obj)
        .then(res => {
          // console.log("added successfull");  
        })
        .catch(err => {
          // console.log("not got added"); 
          // window.alert("Unable to  register user !!"); 
        });
    // console.log("added successfull");  
  })
  .catch(err => {
    // console.log("not got added"); 
    // window.alert("Unable to  register user !!"); 
  });
  // ***************************** FOR STATS REPORT **************************

  axios
    .post("http://localhost:4000/data/acceptjoinreq", detailsobj)

    .then(res => {
      // console.log("User request accepted.");  
      // window.alert("User request accepted.");  
    })        
    .catch(err => {
      // console.log("Unable to process the request !! "); 
      // window.alert("Unable to process the request !! "); 
    });

  

  

    // window.location.reload();

}



// FUNCTION TO REJECT THE USER
function rejectuser(para){

  var url = window.location.pathname;
  url =   url.slice(0, -8);
  var id = url.substring(url.lastIndexOf('/') + 1);
  // console.log(id);
  // you have to delete the user from the request array 
  // console.log("temparr before is -> " , requsers);
  var result = arrayRemove(requsers, para.course.email);
  // console.log("temparr after is -> " , result);

  const detailsobj = {
    userarr: result,
    subgreid : id
  }
  console.log("posting to backend", detailsobj);
   
  axios
    .post("http://localhost:4000/data/rejectjoinreq", detailsobj)

    .then(res => {
      // console.log("User request rejected.");  
      window.alert("User request rejected.");  
    })        
    .catch(err => {
      // console.log("Unable to process the request !! "); 
      window.alert("Unable to process the request !! "); 
    });

    window.location.reload();
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



class joinreqsubgrepg extends React.Component {
  
  // useless
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      PeopleData: {},
    };

  }

  // most useful
  componentDidMount() {

    const jwt = getJwt();
    if (!jwt) {
        this.props.history.push("/login");
      } else {
        
        // first extract the email of the current user HERE TIMEPASS
        axios
        .get("http://localhost:4000/auth", {
          headers: { authorization: `Bearer: ${jwt}` }
        })
        .then(res => {

          // NOW GIVE ANOTHER AXIOS REQUEST TO EXCESS THE DATA USING ID
          //.............................................................
          var url = window.location.pathname;
          url =   url.slice(0, -8);
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
                // console.log(respe.data[0]);
                // now set the array to display
                  requsers = (respe.data[0].Requestusers);
                  peoplearray = (respe.data[0].People);
                  this.setState({
                    userData: respe.data[0],  
                  });  
                  // console.log("my requsers details -> " , requsers);

                  // NOW YOU HAVE TO EXTRACT ALL THE INFO OF THE PEOPLES IN THE ARRAY
                  //-------------------------------------------------------------------------------
                  const sendobj2 = {arraytosend: requsers}
                  axios
                  .post("http://localhost:4000/data/joinreqpg" , sendobj2)
                  .then(respe2 => {
                    if (respe2.data === "Invalid Credentials") {
                      console.log("invalid");
                  
                    } else {
                      // console.log("here i am - > " , respe2.data);

                      todisplay = (respe2.data);
                      this.setState({
                        PeopleData: respe2.data,  
                      });

                      // console.log("my user details -> " , todisplay);
                    }
                  })
                  .catch(err => {
                    console.log(" ----------> here we got an error");
                  });
                  //-------------------------------------------------------------------------------

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

        // console.log("here" , this.state.userData);
        
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
       <div style={{display: "flex" ,  flexWrap: "wrap"}}>
       
          {todisplay.map((course, index) => {
              return (
                <div style={mystyle1} key={index}>
                <h2 style={{color: "Black" , marginLeft: "10px"}} > {index + 1} </h2>
                {/* First name of the user */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}> Firstname:    {course.FirstName} </Label>
                {/* Last name of the user  */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}> Lastname:    {course.Lastname} </Label>
                {/* User name of the user  */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}> Username:    {course.Username} </Label>
                {/* Email of the user */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}> Email:    {course.email} </Label>
                {/* Contact number of the user */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px",  fontSize: "20px" }}>  Contact no.    {course.Contactno} </Label>
                <Button onClick={() => { acceptuser({course}) }} style={{color: "Green",marginLeft: "15%", marginTop: "15px",  fontSize: "14px" }} variant="outlined"> Accept </Button>
                <Button onClick={() => { rejectuser({course}) }} style={{color: "Red",marginLeft: "12%", marginTop: "15px",  fontSize: "14px" }} variant="outlined"> Reject </Button>
                </div>
                )
          })}
        </div>
        <Box mt={78}>
            <Copyright />
        </Box>
      
      </div>
    );
  }
}

export default withRouter(joinreqsubgrepg);