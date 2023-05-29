import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from '@material-ui/core';
import { BiHome , BiLogIn , BiLogOut , BiArrowToRight } from "react-icons/bi";
import axios from "axios";
import { Label } from 'semantic-ui-react'
import EditableTextField from "./txt";
import Demo1 from './followers';
import Demo2 from './following';
import { fnameexp } from './txt';
import { lnameexp } from './txt';
import { unameexp } from './txt';
import { ageexp } from './txt';
import { cnoexp } from './txt';
import { changehua } from './txt';
import $ from 'jquery';
import jQuery from 'jquery'

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
  marginLeft: "200px",
  marginTop: "30px",
  height: "530px",
  color: "white",
  width: "500px",
  backgroundColor: "white",
  padding: "10px",
  fontFamily: "Arial",
  fontColor: "black",
  borderRadius: "35px",

};

const dropmenustyle = {
  marginLeft: "600px",
  marginTop: "0px",
  height: "13px",
  color: "white",
  width: "150px",
  padding: "10px", 
  fontFamily: "Arial",
  fontColor: "black",
  borderRadius: "35px",
  display: "flex"
};

export var passemail = "";
var email = "";
var foling = [];

export var strflag = 'wait';

function myeditfunc(){
  // console.log("in function" );
  strflag = 'done';
  // console.log("---> " , changehua);
  // return;

  const detailsobj = {
    fname: fnameexp,
    Lname: lnameexp,
    Uname: unameexp,
    age: ageexp,
    ctnum: cnoexp,
    email: email
  }

      console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/updateedit", detailsobj)
        
        .then(res => {
          console.log("added successfull");  
          window.alert("User details updated successfully !!");
          window.location.reload()
        })        
        .catch(err => {
          console.log("not got added"); 
          window.alert("Unable to update User details !!"); 
        });

}

function mainpageredirect(){
  // console.log("mainnnnnnn" , changehua)
  if(changehua === "yes"){
    var temp = prompt("All the changes made will be lost " , "ALERT")
    // console.log(temp)

    if(temp == "ALERT"){
      window.location.href = "/main"
    }

  }else{
    window.location.href = "/main"
  }

} 


function savedpostsredirect(){
  // console.log("mainnnnnnn" , changehua)
  if(changehua === "yes"){
    var temp = prompt("All the changes made will be lost " , "ALERT")
    // console.log(temp)

    if(temp == "ALERT"){
      window.location.href = "/savedposts"
    }

  }else{
    window.location.href = "/savedposts"
  }

} 

function logoutredirect(){
  if(changehua === "yes"){
    var temp = prompt("All the changes made will be lost " , "ALERT")
    // console.log(temp)

    if(temp == "ALERT"){
      localStorage.removeItem("access-token");
        window.location.reload();
    }

  }else{
    localStorage.removeItem("access-token");
        window.location.reload();
  }
}

function subgredirect(){
  if(changehua === "yes"){
    var temp = prompt("All the changes made will be lost " , "ALERT")
    // console.log(temp)

    if(temp == "ALERT"){
      window.location.href = "/subg"
    }

  }else{
    window.location.href = "/subg"
  }
}


function allsubgredirect(){
  if(changehua === "yes"){
    var temp = prompt("All the changes made will be lost " , "ALERT")
    // console.log(temp)

    if(temp == "ALERT"){
      window.location.href = "/globalsubg"
    }

  }else{
    window.location.href = "/globalsubg"
  }
}


class Propg extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userData: {},
          fflw: {},
          editMode: false,
          mouseOver: false,
          ischanged: "no"
        };
        console.log("in the constructor");
        this.logout = this.logout.bind(this);
        // this.handleBackButton = this.handleBackButton.bind(this);
      }
        
      componentDidMount() {

        const jwt = getJwt();
        if (!jwt) {
          this.props.history.push("/login");
        } else {

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
                .post("http://localhost:4000/data/getuserdata", sendobj)
                .then(respe => {
                  if (respe.data === "Invalid Credentials") {
                    console.log("invalid");
                  //   window.alert("Invalid Credentials");
                
                  } else {
                    // console.log("valid");
                    console.log(" -- > data in " , respe.data);
                    // fname = respe.data[0].FirstName;

                      this.setState({
                        userData: respe.data[0],  
                      });  
                      // console.log("here the state is :" , this.state.userData.followers)
                    // localStorage.setItem("access-token", res.data);
                    // (window.location.href = "/main")
            
                  }
                })
                .catch(err => {
                  console.log(" ----------> here we got an error");
                });
              
              email =  res.data.email;
              passemail = res.data.email;
              foling = res.data.followings;
              passemail = res.data.email;
              // followw = res.data.followers;
            })
            .catch(err => {
              console.log("error here is -->  ", JSON.stringify(err));
              localStorage.removeItem("access-token");
              this.props.history.push("/login");
            });

          // console.log("finally done with here");
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
            style={{color: 'white'}}
              variant="h5"
              color="inherit"
              noWrap
            >
              GREDDIIT
            </Typography>

            <nav   style={{paddingLeft: "520px", color: "white" }}>
            {/* <Link
              style={{paddingRight: "25px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                href="/subg"
              >
                MY SUBGREDDITS 
              </Link> */}
            {/* <Link
              style={{paddingRight: "25px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                href="/main"
              >
                MAIN PAGE
              </Link> */}
              {/* <Button variant="outlined" color="white" style={{marginBottom: "25px",color: "white", borderColor: '#FFFFE8',}} onClick={() => { window.location.href = "/subg" }}>
                My Subgreddits
              </Button> */}
              <Button variant="outlined" style={{paddingRight: "25px", paddingLeft: "15px", fontSize: "15px",borderColor: '#FFFFE8', fontFamily: "verdana", color: "white" }} onClick={() => allsubgredirect()}>
              ALL SUBGREDDITS 
              </Button>

              <Button variant="outlined" style={{paddingRight: "25px", paddingLeft: "15px",marginLeft:"14px", fontSize: "15px",borderColor: '#FFFFE8', fontFamily: "verdana", color: "white" }} onClick={() => subgredirect()}>
              MY SUBGREDDITS 
              </Button>

              <Button variant="outlined" style={{paddingRight: "25px", paddingLeft: "15px",marginLeft:"14px", fontSize: "15px",borderColor: '#FFFFE8', fontFamily: "verdana", color: "white" }} onClick={() => mainpageredirect()}>
              Mainpage 
              </Button>

              <Button variant="outlined" style={{paddingRight: "25px", paddingLeft: "15px", fontSize: "15px",marginLeft:"14px",borderColor: '#FFFFE8', fontFamily: "verdana", color: "white" }} onClick={() => savedpostsredirect()}>
              Saved Post 
              </Button>

              

              <Button variant="outlined" style={{marginLeft:"14px",color: "white", borderColor: '#FFFFE8',}} onClick={() => logoutredirect()}>
              Logout &nbsp;
                <BiLogOut style={{fontSize: "25px"}}/>
              </Button>
            </nav>   
          </Toolbar>
        </AppBar>
        <h1 style={{color: "Black"}}> {changehua} </h1>
        <div style={mystyle1}  >
        
        <div style={dropmenustyle}>
        <Demo1 class={passemail} />
        <Demo2 class={passemail} />
        </div>
        
        <p style={{color: "Black" , marginLeft: "180px" , fontSize: "25px" }}> User Profile </p>
        
   
        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "30px" , fontSize: "20px" }}> First Name :  </Label>
        <EditableTextField class="fname" value={this.state.userData.FirstName}/>
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "30px" , fontSize: "20px"}}> Last Name :  </Label>
        <EditableTextField class="lname" value={this.state.userData.Lastname} />
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "26px", fontSize: "20px" }}> User Name :  </Label>
        <EditableTextField  class="uname" value={this.state.userData.Username} />
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "89px", fontSize: "20px" }}> Age :  </Label>
        <EditableTextField class="age" value={this.state.userData.Age} />
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "30px", fontSize: "20px" }}> Contact No :  </Label>
        <EditableTextField class="cno" value={this.state.userData.Contactno} />
        </div>
        
        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "70px", fontSize: "20px" }}> Email :  </Label>
        <Label style={{color: "Black",marginLeft: "10px", marginTop: "22px", marginRight: "70px" }}>{email} </Label>
        </div>
        
        <Button variant="contained" onClick={() => myeditfunc()}
        style={{marginLeft: "180px" ,marginTop: "20px" }}
        >Update</Button>

        
        </div>
        
        <Box mt={6}>
            <Copyright />
        </Box>
      </div>
    );
  }
}


// export default withRouter(connect(
//   mapStateToProps)(Propg));

export default withRouter(Propg);