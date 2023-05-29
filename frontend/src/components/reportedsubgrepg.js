import React from 'react';
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, colors } from '@material-ui/core';
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import { FiArrowUpCircle } from "react-icons/fi";
import { FiArrowDownCircle } from "react-icons/fi";


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

// FUNCTION TO UPDATE IGNORE VALUE IN BACKEND
function ignoreupdate(para){
  console.log("in ignoreupdate - > " , para._id);

  const detailsobj = {
    mainid: para._id,
    parameter: "1"
  }

  console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/ignoredreport ", detailsobj)
        .then(res => {
          // window.alert("Left successfully !!");
          // window.location.reload()
        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });

}

// FUNCTION TO DELETE THE REQUEST
function deleteythereq(para){
  // console.log("in deleteythereq - > " , para.course._id);4

  // ***************************** FOR STATS REPORT **************************

  const date1 = new Date();
  let day1 = date1.getDate();
  let month1 = date1.getMonth() + 1;
  let year1 = date1.getFullYear();

  let currentDate = `${day1}-${month1}-${year1}`;
  const obj = {
    datetoday: currentDate,
    sbid : para.course.subgredditid
  }

  console.log("posting to backend", obj);
  axios
  .post("http://localhost:4000/data/checkdateexists", obj)
  .then(res => {
    // console.log("posting to backend", detailsobj);
        axios
        .post("http://localhost:4000/data/incdeletedreports", obj)
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

  const detailsobj11 = {
    mainid: para.course._id
  }

  axios
        .post("http://localhost:4000/data/deletereport ", detailsobj11)
        .then(res => {
          // window.alert("Left successfully !!");
          window.location.reload()
        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });


      console.log("in blockeduserfunc - > " , para.course);
      var temp = para.course;
      para = temp;
  const detailsobj = {
    idtosend: para.subgredditid,
  }
  console.log("posting to backend", detailsobj);
  // return;
  var mainarr = [];
      axios
        .post("http://localhost:4000/data/showuserpage ", detailsobj)
        .then(res => {
          // window.alert("Left successfully !!");
          // window.location.reload()
          // console.log(res.data[0].Posts);
          
          var updarr = res.data[0].Posts;
          for(let i = 0 ; i< res.data[0].Posts.length ; i++){
            if((updarr[i].text === para.Postarr[0].text) && (updarr[i].postedby === para.Postarr[0].postedby) &&
            (updarr[i].postedin === para.Postarr[0].postedin) && (updarr[i].upvotes === para.Postarr[0].upvotes) && (updarr[i].downvotes === para.Postarr[0].downvotes)){
              // console.log("-> matched" , updarr[i]);
              // updarr[i].postedby = "Blocked User";
            }
            else{
              mainarr.push(updarr[i]);
            }

          }
          updarr = mainarr;
          console.log(updarr);
          // NOW UPDATE IN DATABASE THE ARRAY
          const sendobj = {
            subgreid: para.subgredditid,
            postupd: updarr,
          }
          console.log(sendobj);
          axios
        .post("http://localhost:4000/data/votesupdate ", sendobj)
        .then(res => {
          window.location.reload();
        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });


        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });

}

// FUNCTION TO SET ISIGNORED TO 2 WHEN USER BLOCKED
function blockignupd(para){
  console.log("in ignoreupdate - > " , para._id);

  const detailsobj = {
    mainid: para._id,
    parameter: "2"
  }

  console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/ignoredreport ", detailsobj)
        .then(res => {
          // window.alert("Left successfully !!");
          // window.location.reload()
        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });

        

      

}

function arrayRemove(arr, value) {
  return arr.filter(function(temp){
      return temp !== value;
  });
}

// FUNCTION TO BLOCK THE USER IN BACKEND
// --------------------------------------------------------------------------------
function blockeduserfunc(para){
  console.log("in blockeduserfunc - > " , para.Postarr[0]);
  const detailsobj = {
    idtosend: para.subgredditid,
  }

  // console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/showuserpage ", detailsobj)
        .then(res => {
          // window.alert("Left successfully !!");
          // window.location.reload()
          // console.log(res.data[0].Posts);
          // console.log("resdatais -> " , res.data[0].BlockedPeople);
          var blkpeepsupd = res.data[0].BlockedPeople;
          // blkpeepsupd.push()
          var updarr = res.data[0].Posts;
          for(let i = 0 ; i< res.data[0].Posts.length ; i++){
            if((updarr[i].text === para.Postarr[0].text) && (updarr[i].postedby === para.Postarr[0].postedby) &&
            (updarr[i].postedin === para.Postarr[0].postedin) && (updarr[i].upvotes === para.Postarr[0].upvotes) && (updarr[i].downvotes === para.Postarr[0].downvotes)){
              // console.log("-> matched" , updarr[i]);
              blkpeepsupd.push(updarr[i].postedby);
              updarr[i].postedby = "Blocked User";
              break;
            }
          }

          console.log(" ---> " , blkpeepsupd)



          console.log(updarr);
          // NOW UPDATE IN DATABASE THE ARRAY
          const sendobj = {
            subgreid: para.subgredditid,
            postupd: updarr,
          }

          axios
        .post("http://localhost:4000/data/votesupdate ", sendobj)
        .then(res => {
          window.location.reload();
        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });

        const sendobj2 ={
          subgreid: para.subgredditid,
          blkupd: blkpeepsupd,
        }
          axios
        .post("http://localhost:4000/data/blkarrayupdate ", sendobj2)
        .then(res => {
          window.location.reload();
        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });


        })        
        .catch(err => {
          // window.alert("Unable to leave successfully !!"); 
          // window.location.reload()
        });

}
// --------------------------------------------------------------------------------

export const getJwt = () => {
    return localStorage.getItem("access-token");
};


class savedpostpg extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userData: {},
          mypostarray: [],
          ignoredpushed: [],
          isblocked: [],
          count: "3",
          iscounting: false,
          countingbutton: [],
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
              var tempurl = window.location.pathname;
              var url =   tempurl.slice(0, -7);
              var id = url.substring(url.lastIndexOf('/') + 1); 
              console.log(id);
              const sendobj = {
                subgid: id
              }
              axios
                .post("http://localhost:4000/data/getreportedposts" , sendobj)
                .then(respe => {
                  if (respe.data === "Invalid Credentials") {
                    console.log("invalid");
                
                  } else {
                    console.log(respe.data)
                    // console.log(" -- > data in " , respe.data[0].Postarr[0]);
                    var temparr = [];
                    // // arrayofposts = respe.data.Postarr;
                    var ign = [];
                    var isblk = [];
                    for (let i = 0; i < respe.data.length; i++) {
                        temparr.push(respe.data[i]);
                        if(respe.data[i].isignored == "1"){
                          ign.push(respe.data[i]._id);
                        }else if(respe.data[i].isignored == "2"){
                          isblk.push(respe.data[i]._id);
                        }
                        // console.log(respe.data[i]._id);
                    }
                    // // console.log(typeof(mysubgres));
                    // console.log((isblk));
                    this.setState({ignoredpushed: ign});
                    this.setState({isblocked: isblk});
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
        
// FUNCTION TO SET THE IGNORE BUTTON
ignorecomment(para){
  // console.log( "in ignorecomment - > " , para.course);
  // console.log( "in id - > " , para.course._id);
  var temparr = this.state.ignoredpushed;
  temparr.push(para.course._id);
  this.setState({ignoredpushed: temparr})
  ignoreupdate(para.course);
  
}

useeffectsubs(para){

  // console.log("useeffectsubs")
  // console.log(para)
  var tempnot = true
  let intervalId;
  if (tempnot) {
    // console.log("inside first if")
      intervalId = setInterval(() => {
          var prev = this.state.count;
          // console.log("prev is: " , prev)
          if(prev > 1){
            this.setState({count: prev-1})
            // console.log("inside prev > 1")
          }
          else{
            clearInterval(intervalId);

            console.log("call")
            this.callfunc(para);
            this.setState({iscounting: false})
                  this.setState({count: 0})
          }
      }, 1000);
  } else {
      clearInterval(intervalId);
  }
 
}

callfunc(parapass){ 

  if(this.state.countingbutton.length > 0 && this.state.iscounting == true){
    // console.log(parapass)
    this.blockeduser(parapass)
  }
  // console.log("hi");
  // cons/ole.log(this.state.countingbutton)
  // this.blockeduser({course})
};

// FUNCTION TO SET THE BLOCK USER BUTTON
blockeduser(para){
  // console.log( "in blockeduser - > " , para.course);
  // console.log( "in id - > " , para.course._id);
  // var temparr = this.state.ignoredpushed;
  // temparr.push(para.course._id);
  // this.setState({ignoredpushed: temparr})
  blockignupd(para.course);
  blockeduserfunc(para.course);
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
              <h4>Reported By : {course.Reportedby}</h4>
              <h4>Whom we have reported : {course.Postarr[0].postedby}</h4>
              <h4>Concern : {course.concern}</h4>
              <h4>Text : {course.Postarr[0].text}</h4>
              {/* <h4>ID : {course._id}</h4> */}


              {/* <Button
              style={{margin : "10px"}}
              onClick={() =>  this.blockeduser({course}) }
              type="submit"
              variant="contained"
              disabled = {this.state.ignoredpushed.includes(course._id)}
            >
            {this.state.isblocked.includes(course._id) ? 'Blocked' : 'Block'} 
              {/* Block User */}
            {/* </Button> */} 

            <Button
                    type="button"
                    className="btn btn-danger"
                    // onClick={handleClick}
                    variant="contained"
                    onClick={() => {
                      // console.log("HERE");
                      if(this.state.iscounting == true){
                        this.setState({iscounting: false})
                        var yt = this.state.countingbutton;
                        var ret = arrayRemove(yt , course._id)
                        this.setState({countingbutton: ret})

                      }else{
                      this.setState({count: 5})
                      this.setState({iscounting: true})
                      var yt = this.state.countingbutton;
                      yt.push(course._id)
                      this.setState({countingbutton: yt})
                      this.setState({iscounting: true})
                      this.useeffectsubs({course})
                      }
                    } }
                    disabled = {this.state.isblocked.includes(course._id) || this.state.ignoredpushed.includes(course._id) } 
                >
                    {(this.state.iscounting && this.state.countingbutton.includes(course._id)) ? `Cancel in ${this.state.count} secs` : 'Block User'}
            </Button>
           
            <Button
            style={{margin : "10px"}}
              onClick={() =>  deleteythereq({course}) }
              type="submit"
              variant="contained"
              disabled = {this.state.ignoredpushed.includes(course._id)|| this.state.isblocked.includes(course._id)}
            >
               Delete Post
            </Button>
            
            <Button
            style={{margin : "10px"}}
              onClick={() =>  this.ignorecomment({course}) }
              type="submit"
              variant="contained"
              disabled = { this.state.isblocked.includes(course._id)}
            >
              {this.state.ignoredpushed.includes(course._id) ? 'Ignored' : 'Ignore'}              
            </Button>
              <div >
              
              </div>
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