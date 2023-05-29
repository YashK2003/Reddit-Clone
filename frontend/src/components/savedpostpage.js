import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from '@material-ui/core';
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import { FiArrowUpCircle } from "react-icons/fi";
import { FiArrowDownCircle } from "react-icons/fi";
import { Label } from 'semantic-ui-react'

var majorarray = [];

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

function removefromsarray(para){
  // console.log("in removefromsarray " , para.course );
  // console.log(majorarray)
  var idtodel = "";
  for(let i=0 ; i<majorarray.length ; i++){
    if(majorarray[i].Postarr[0] == para.course){
    // console.log("---> " , majorarray[i]._id);
    idtodel = majorarray[i]._id;
    }
  }

  // DELETE THE ID FROM SAVED POST ARRAY
  
  const detailsobj = {
    mainid: idtodel,
  }

  console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/deletesavedpost ", detailsobj)
        .then(res => {
          window.alert("Removed successfully !!");
          window.location.reload()
        })        
        .catch(err => {
          window.alert("Unable to leave successfully !!"); 
          window.location.reload()
        });

}

class savedpostpg extends React.Component {

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
                .post("http://localhost:4000/data/getsavedposts" , sendobj)
                .then(respe => {
                  if (respe.data === "Invalid Credentials") {
                    console.log("invalid");
                
                  } else {
                    // console.log(respe.data)
                    majorarray = respe.data;
                    this.setState({userData: respe.data});
                    // console.log(" -- > data in " , respe.data[0].Postarr[0]);
                    var temparr = [];
                    // arrayofposts = respe.data.Postarr;
                    
                    for (let i = 0; i < respe.data.length; i++) {
                        temparr.push(respe.data[i].Postarr[0]);
                    }
                    // console.log(typeof(mysubgres));
                    // console.log((temparr));
                    this.setState({mypostarray: temparr});
                    
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
      </div>
        </div>
        <div style={{display: "flex" ,  flexWrap: "wrap"}}>
        {this.state.mypostarray.map((course, index) => {
          return (
            <div key={index}  style = {{marginTop: "20px" , marginLeft:"150px" , padding: "20px" ,   fontFamily: "Calibri",backgroundColor: "white"  ,width : "900px" ,  borderRadius: "35px", fontSize: "20px"}}>
              <h4>Text: {course.text}</h4>
              <h4>Posted by: {course.postedby}</h4>
              <h4>Posted in : {course.postedin}</h4>
              <IconButton   aria-label="delete">
              <FiArrowUpCircle  style={{fontSize: "30px"}} />
              </IconButton>
              {this.state.mypostarray[index].upvotes}
              <IconButton aria-label="delete">
              <FiArrowDownCircle style={{fontSize: "30px"}} />
              </IconButton>
              {course.downvotes}
              <div >
              <h4>Comments: {course.comments.length}</h4>
              
              {this.state.mypostarray[index].comments.map((itr , idx) =>{
                  return ( <p key={idx}>{idx+1}. {itr}</p> )
              })}
              </div>
              <Button onClick={() => { removefromsarray({course}) }} style={{marginLeft: "1%",   fontSize: "14px" }}  variant="contained">
                Remove
               </Button>
            </div>
          );
          })
        }
        </div>
        <Box mt={14}>
            <Copyright />
        </Box>
      </div>
    );
  }
}

export default withRouter(savedpostpg);