import React from 'react';
import { withRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from '@material-ui/core';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import photo from "./photo.png";
import { FiArrowUpCircle } from "react-icons/fi";
import { FiArrowDownCircle } from "react-icons/fi";
import Demo from './demo';
import Demo2 from './demo2';

var arrayofposts = [];
var obj = "";
var mycurrentemail="";

// FUNCTION TO UPDATE UPVOTE IN BACKEND
function upvotefuncBACKEND(para){
  console.log("in upvotefuncBACKEND - > " , para);
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  const detailsobj = {
    subgreid: id,
    postupd: para
  }

  console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/votesupdate ", detailsobj)
        .then(res => {
          // window.alert("Left successfully !!");
          // window.location.reload()
        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });

}

// FUNCTION TO SAVE THE POST 
function savepostfunc(para){
  console.log("in addcommentsfunc - > " , para);
  // console.log("email of user is: " , mycurrentemail );
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  const detailsobj = {
    useremail: mycurrentemail,
    mypost: para.course,
    subgreid: id
  }
  // SEND THE DATA OF THE 
  console.log("posting to backend", detailsobj);
  axios
    .post("http://localhost:4000/data/addsavedpost ", detailsobj)
    .then(res => {
      // window.alert("Left successfully !!");
      // window.location.reload()
    })        
    .catch(err => {
      // window.alert("Unable to leave successfully !!"); 
      // window.location.reload()
    });

}

// FUNCTION TO FOLLOW THE POSTED BY USER 
function followpostedbyfunc(para){
  console.log("email of current user -> " , mycurrentemail);
  console.log("email of user to follow  -> " , para.course.postedby);
  const detailsobj = {
    currentuseremail: mycurrentemail,
    tofollowemail: para.course.postedby,
  }

  console.log("posting to backend", detailsobj);
  axios
    .post("http://localhost:4000/data/makefollowers ", detailsobj)
    .then(res => {
      // window.alert("Left successfully !!");
      // window.location.reload()
    })        
    .catch(err => {
      // window.alert("Unable to leave successfully !!"); 
      // window.location.reload()
    });

}

// FUNCTION TO CREATE A NEW POST
function createposthere(){
  console.log("in create post - > ");
 

}

// FUNCTION TO REPORT THE POST
function reportpost(para){
  console.log("in reportpost post - > " , para.course);
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  var current = new Date();
  var currentdate = current.toString();
  const detailsobj = {
    postarray:  para.course,
    reportedby: mycurrentemail,
    concern: "nothing but everything.",
    subgid: id,
    dateofreport: currentdate,
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

  console.log("posting to backend", detailsobj);
  axios
  .post("http://localhost:4000/data/checkdateexists", obj)
  .then(res => {
    // console.log("posting to backend", detailsobj);
        axios
        .post("http://localhost:4000/data/incrementreports", obj)
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
  console.log(detailsobj);
  axios
    .post("http://localhost:4000/data/addreportedpost ", detailsobj)
    .then(res => {
      // window.alert("Left successfully !!");
      // window.location.reload()
    })        
    .catch(err => {
      // window.alert("Unable to leave successfully !!"); 
      // window.location.reload()
    });


}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const mystyles = {
  marginTop: "60px",
    height: "900px",
    color: "black",
    width: "300px",
    backgroundColor: "#FB2576",
    fontFamily: "Arial",
    fontColor: "black",
    position: "fixed"
  };


export const getJwt = () => {
    return localStorage.getItem("access-token");
};
  
class redirectpg extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userData: {},
          peoplelength: "",
          postnumber: "",
          modalopen: false,
          mypostarray: [],
          mycomment: {},
          useremail: "",
        };

        this.upvotefunc = this.upvotefunc.bind(this);
        this.downvotefunc = this.downvotefunc.bind(this);
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

                mycurrentemail = res.data.email;
                this.setState({useremail: mycurrentemail});
                // now extract the subgreddit data from id 
                var url = window.location.pathname;
                var id = url.substring(url.lastIndexOf('/') + 1);
                // console.log("id is : " , id);
                const sendobj = {
                    idtosend: id
                  }

                  axios
                    .post("http://localhost:4000/data/showuserpage" , sendobj)
                    .then(respe => {
                      if (respe.data === "Invalid Credentials") {
                        console.log("invalid");
                    
                      } else {
                        // console.log(" --> " , respe.data);
                        arrayofposts = respe.data[0].Posts;
                        this.setState({
                            userData: respe.data[0],  
                            peoplelength: respe.data[0].People.length,
                            postnumber: respe.data[0].Posts.length,
                            mypostarray: respe.data[0].Posts
                          });

                          // HERE WE DO THE BANNED KEYWORDS STUFF
                          //-------------------------------------------------------------------------
                          var changes = 0;
                          var temparrforban = this.state.mypostarray;
                          console.log("g -> " , temparrforban);
                          var str1 = this.state.userData.Bannedkeywords;
                          var str = str1.split(" ").join("")
                          var parts = str.split(',');
                          console.log(parts);
                          console.log("my words are -> " , this.state.mypostarray);
                          // now parts contains the letters which are banned
                          for(let itr = 0 ; itr < this.state.mypostarray.length ; itr++){
                          console.log( respe.data[0].Posts[itr].text)
                          var mytext = respe.data[0].Posts[itr].text.split(" ")

                          // var temptext = mytext.split(/([_\W])/)
                        

                          // console.log(temptext)

                          console.log("my previous text is  " , mytext);
                          for(let i= 0 ; i< parts.length; i++){

                            for(let j=0 ; j<mytext.length ; j++){
                              
                              var strchk = mytext[j].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                              console.log(" ->>>>> " , strchk);
                              // case 2 starting punctuation marks
                              // case 3 ending punctuation marks

                              // case 4 both end punctuation marks

                              if(strchk == parts[i].toLowerCase()){
                                mytext[j] = mytext[j].replace(/./gi , '*');
                                changes++;
                              }
                            }

                          }
                          var finaltext = mytext.join(" ");
                          console.log("my finaltext is  " , finaltext);
                          temparrforban[itr].text = finaltext;
                          // console.log("->" , arrayofposts[itr].text)
                        }

                        // console.log("g -> " , temparrforban);
                        this.setState({mypostarray: temparrforban});
                        // console.log(this.state.mypostarray);
                        // if(changes > 0){
                        //   window.alert("The posts contain banned words !!");
                        // }
                        //-------------------------------------------------------------------------

                      }
                    })
                    .catch(err => {
                      console.log(" ----------> here we got an error" , err);
                    });
              })
              .catch(err => {
                console.log("error here is -->  ", JSON.stringify(err));
                localStorage.removeItem("access-token");
                this.props.history.push("/login");
              });
          }
      }

      
// FUNCTION TO UPVOTE
upvotefunc(para){
  var temparr = this.state.mypostarray;
  for(let i=0 ; i<  temparr.length ; i++){
    if(temparr[i] === para.course){
          temparr[i].upvotes++;
    }
  }
  this.setState({mypostarray: temparr});
  upvotefuncBACKEND(temparr)
};
  
// FUNCTION TO UPVOTE
downvotefunc(para){
  var temparr = this.state.mypostarray;
  for(let i=0 ; i<  temparr.length ; i++){
    if(temparr[i] === para.course){
          temparr[i].downvotes--;
    }
  }
  this.setState({mypostarray: temparr});
  upvotefuncBACKEND(temparr)
};
   
// FUNCTION TO ADD COMMENT
addcommentfunc(para){
 console.log( "in addcomment - > " , para.course);
//  console.log("herein -> " , obj);
  var temparr = this.state.mypostarray;
  for(let i=0 ; i<  temparr.length ; i++){
    if(temparr[i] === para.course){
          temparr[i].comments.push(obj);
    }
  }

  // console.log(temparr);
  this.setState({mypostarray: temparr});
  upvotefuncBACKEND(temparr)
 
};    

  render() {
    return(
      <div >
        <AppBar
          position="fixed"
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

            <nav   style={{paddingLeft: "1060px", color: "white" }}>
            <Link
              style={{paddingRight: "25px", paddingLeft: "15px", fontSize: "15px", fontFamily: "verdana", color: "white" }}
                variant="button"
                href="/globalsubg"
              >
                BACK
              </Link>
              <Button variant="outlined"  style={{color: "white", borderColor: '#FFFFE8',}} onClick={this.logout}>
                Logout
              </Button>
            </nav>   
          </Toolbar>
        </AppBar>
        <div style= {{display: "flex"}}>
        
        <div style = {mystyles}>
        <img style = {{margin: "35px" , borderRadius: "10%"}} src={photo} alt="Photo" />
        <h3 style={{marginLeft: "2%",   fontSize: "20px" }}> Name: {this.state.userData.Name} </h3>
        <h3 style={{marginLeft: "2%",   fontSize: "20px" }}> Number of Peoples: {this.state.peoplelength} </h3>
        <h3 style={{marginLeft: "2%",   fontSize: "20px" }}> Number of Posts: {this.state.postnumber} </h3>
        </div>

        <div style = {{marginTop: "60px",marginLeft:"300px", color: "black" , backgroundColor: "red"  , width: "1600px"}}> 

        {/* BUTTON TO CREATE THE SUBGREDDIT */}
       
        
        {/* <h1>{arrayofposts[0].upvotes} </h1> */}
        {/* RENDER ALL THE POSTS HERE */}

        {/* <Demo2 parapass={course} mycurrentemail={this.state.useremail}/> */}

        <Demo postedinname={this.state.userData.Name} postedbyname ={this.state.userData} curruseremail={this.state.useremail}/>

        
        {arrayofposts.map((course, index) => {
          return (
            <div key={index}  style = {{marginBottom: "15px"     ,marginTop: "20px" , marginLeft:"150px" , backgroundColor: "white", borderRadius: "35px",padding: "20px" ,   fontFamily: "Calibri",fontSize: "20px",  width : "900px"}}>
              <h4>Text: {this.state.mypostarray[index].text}</h4>
              <h4>Posted by: {course.postedby}</h4>

              <IconButton  onClick={() =>  this.upvotefunc({course}) } aria-label="delete">
              <FiArrowUpCircle  style={{fontSize: "30px"}} />
              </IconButton>

              {this.state.mypostarray[index].upvotes}

              <IconButton  onClick={() =>  this.downvotefunc({course}) } aria-label="delete">
              <FiArrowDownCircle style={{fontSize: "30px"}} />
              </IconButton>

              {course.downvotes}
              <div >
              <h4>Comments: {course.comments.length}</h4>
              
              {this.state.mypostarray[index].comments.map((itr , idx) =>{
                  return ( <p key={idx}>{idx+1}. {itr}</p> )
              })}
            
              <TextField label="Comment" variant="outlined" 
                  id="comment"
                  name="comment"
                  autoComplete="off"
                  onChange={(event) => {this.setState({mycomment: event.target.value}); obj = event.target.value}}
              />
              <Button
              style={{marginLeft: "2%",   fontSize: "14px" }}
              onClick={() =>  this.addcommentfunc({course}) }
              type="submit"
              variant="contained"
            >
              Add Comment 
            </Button>

            <Button onClick={() => { savepostfunc({course}) }} style={{marginLeft: "2%",   fontSize: "14px" }}  variant="contained"> Save </Button>
            
            <Button onClick={() => { followpostedbyfunc({course}) }} style={{marginLeft: "2%",   fontSize: "14px" }}  variant="contained"> Follow {course.postedby} </Button>

            {/* <Button onClick={() => { reportpost({course}) }} style={{marginLeft: "2%",   fontSize: "14px" }}  variant="contained"> Report </Button> */}
              <br/>
              <br/>
              
              
            <Demo2 parapass={course} mycurrentemail={this.state.useremail}/>
          
              </div>
            </div>
          );
          })
        }
        </div>
        </div>
      
      </div>
    );
  }
}

export default withRouter(redirectpg);