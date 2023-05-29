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
import SearchBar from "material-ui-search-bar";
import { MenuItem } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { InputLabel , Select } from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import { ListItemText } from '@material-ui/core';
import Fuse from "fuse.js"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


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

function nextpagecall(para){
  console.log("in redirectsubgre subgreddit - > " , para);
  var linkfornext = "/globalsubgre/" + `${para._id}`;
  console.log("my link is : " , linkfornext);
  window.location.href = linkfornext;
}


// FUNCTION TO REDIRECT TO THE SUBGRE WEBPAGE
function redirectsubgre(para){

  console.log("in here bhai")
  // FIRST UPDATE STATS
  // ***************************** FOR STATS REPORT **************************
  const date1 = new Date();
  let day1 = date1.getDate();
  let month1 = date1.getMonth() + 1;
  let year1 = date1.getFullYear();

  let currentDate = `${day1}-${month1}-${year1}`;
  const obj = {
    datetoday: currentDate,
    sbid: para._id
  }

  axios
  .post("http://localhost:4000/data/checkdateexists", obj)
  .then(res => {
    // console.log("posting to backend", obj);
        axios
        .post("http://localhost:4000/data/incnumvisitors", obj)
        .then(res => {
          // console.log("added successfull");  
          nextpagecall(para);
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



  // console.log("in redirectsubgre subgreddit - > " , para);
  // var linkfornext = "/globalsubgre/" + `${para._id}`;
  // console.log("my link is : " , linkfornext);
  // window.location.href = linkfornext;

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

const mystylediv = {
    marginTop: "2%",
    marginLeft: "9%",
    height: "70px",
    color: "black",
    width: "400px",
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
    fontColor: "black",
    borderRadius: "25px",

  };




// FUNCTION TO REDIRECT TO THE SUBGRE WEBPAGE
function opensubgre(para){
  console.log("in open subgreddit - > " , para);
//   var linkfornext = "/subgre/" + `${para.course._id}`;
//   console.log("my link is : " , linkfornext);
//  window.location.href = linkfornext;

}

// FUNCTION TO REDIRECT TO THE SUBGRE WEBPAGE
function doSomethingWith(para){
    // console.log(para);
    // console.log("my data is -> " , mysubgres[2].Name);
   var result =  mysubgres.filter((val) => {
        if(para == ""){
            return val;
        }else if (val.Name.toLowerCase().includes(para.toLowerCase())){
            return val;
        }
    })
  
    // console.log(" -> " , searchterm);
    // mysubgres = result;

}

// function to remove an element from an array
function arrayRemove(arr, value) {
  return arr.filter(function(temp){
      return temp !== value;
  });
}

// FUNCTION TO ADD THE USER TO THE REQUESTED ARRAY OF THE SUBGREDDIT
function joinreq(para){
  console.log("in joinreq subgreddit - > " , curremail);
  console.log("para is -> " , para.course.LeftUsers);
  // console.log("arr is: " , para.course.Requestusers)

  // CHECK IF THE USER HAS ALREADY LEFT OR NOT
  // ********************************
  if(para.course.LeftUsers.includes(curremail)){
    window.alert("You previously left the subgreddit so not allowed to join again.");
    window.location.href = "/globalsubg"
  }
  // ********************************


  var result = para.course.Requestusers;
  result.push(curremail);
  console.log(result)
  const detailsobj = {
    subgreid: para.course._id,
    emaildel: result
  }

  console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/joinreqglbobal ", detailsobj)
        .then(res => {
          window.alert("Joined successfully !!");
          // window.location.href = "/globalsubg"
        })        
        .catch(err => {
          window.alert("Unable to join successfully !!"); 
          window.location.reload()
        });
  window.location.href = "/globalsubg"
}
  

// FUNCTION TO DELETE THE SUBGREDDIT FROM THE LIST
function delsubgre(para){
  // para is the word we have to delete
  console.log("in delete subgreddit - > " , curremail);
  console.log("para is -> " , para.course._id);
  console.log("arr is: " , para.course.People)
  var result = arrayRemove(para.course.People, curremail);
  console.log("arr is: after " ,result )

  var temp = para.course.LeftUsers
  temp.push(curremail);
  // DELETE THE USER FROM THE SUBGREDDIT
  const detailsobj = {
    subgreid: para.course._id,
    emaildel: result,
    leavearr: temp
  }

  console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/leavereq ", detailsobj)
        .then(res => {
          window.alert("Left successfully !!");
          window.location.reload()
        })        
        .catch(err => {
          window.alert("Unable to leave successfully !!"); 
          window.location.reload()
        });

}

var temparr = [];



var curremail = "";
var mysubgres = [];
var alltagslist = [];
var mysubglist = [];


class globalsubgrepg extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userData: {},
          value: "",
          fuzzvalue: "",
          namesort: "0",
          tagsearch: [],
          creationdatesearch: []
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
              
              curremail = res.data.email;
              // NOW GIVE ANOTHER AXIOS REQUEST TO EXCESS THE DATA
              //..............................................................
              const sendobj = {
                email: res.data.email
              }
              axios
                .post("http://localhost:4000/data/getallsubgre" , sendobj)
                .then(respe => {
                  if (respe.data === "Invalid Credentials") {
                    console.log("invalid");
                
                  } else {
                    // console.log(" -- > data in " , respe.data);

                    for (let i = 0; i < respe.data.length; i++) {
                      mysubgres.push(respe.data[i]);
                    }

                    const myset = new Set();                      
                    for (let i = 0; i < respe.data.length; i++) {
                      var tgarr = respe.data[i].Tags.split(',')
                      // console.log(" -> " , tgarr )
                      for(let ji = 0 ; ji < tgarr.length ; ji++){
                        myset.add(tgarr[ji]);  
                      }
                    }

                    // List all entries
                    let text = "";
                    myset.forEach (function(value) {
                      alltagslist.push(value);
                    })

                    // alltagslist = myset.values();
                    // console.log(" -> " , alltagslist);

                    // now here sort the array based on wheteher the user is moderator or not
                    // console.log("before:::: " , mysubgres);
                    var reversearray = mysubgres.reverse();
                    // console.log(reversearray);
                    this.setState({creationdatesearch: reversearray})
                    // console.log(curremail)
                    var tempsort = [];
                    for (let j = 0; j < mysubgres.length; j++) {
                        if(mysubgres[j].Moderators.includes(curremail)){
                          // console.log("->" , mysubgres[j].Name);
                          tempsort.push(mysubgres[j]);
                          mysubglist.push(mysubgres[j]._id);
                        }
                    }

                    for (let j = 0; j < mysubgres.length; j++) {
                      if(mysubgres[j].Moderators.includes(curremail)){
                      }
                      else{
                        tempsort.push(mysubgres[j]);
                      }
                  }
                  
                  mysubgres = tempsort;
                  console.log("after:::: " , mysubgres);
                    

                    // console.log(typeof(mysubgres));
                    // console.log((alltagslist));

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
        <SearchBar
            style={{marginLeft: "8%" , marginTop: "2%"}}
         value={this.state.value}
         onChange={(newValue) => this.setState({ value: newValue }) }
         onRequestSearch={() => doSomethingWith(this.state.value)}
         />
         <p style={{marginLeft: "4%" , marginTop: "3%"}}> Fuzzy SearchBar: </p>
         <SearchBar
            style={{marginLeft: "2%" , marginTop: "2%"}}
         value={this.state.fuzzvalue}
         onChange={(newValue) =>{ this.setState({ fuzzvalue: newValue }) }}
         onRequestSearch={() => doSomethingWith(this.state.fuzzvalue)}
         />

         <div style ={mystylediv}>
         <div style={{marginLeft: "40%",height: "20px"}}>SORT</div>
         <div style={{marginLeft: "1%" , marginTop: "2%" , display: "flex"}}></div>

         <Button onClick={() => this.setState({ namesort: "1" })} style={{color: "Blue",marginLeft: "5%", marginTop: "5px",  fontSize: "13px" }} variant="outlined"> Name </Button>
        
         <Button onClick={() => this.setState({ namesort: "2" })} style={{color: "Blue",marginLeft: "5%", marginTop: "5px",  fontSize: "13px" }} variant="outlined"> Followers </Button>
         
         <Button onClick={() =>{ this.setState({ namesort: "3" }); mysubgres = this.state.creationdatesearch;}} style={{color: "Blue",marginLeft: "5%", marginTop: "5px",  fontSize: "13px" }} variant="outlined"> CreationDate </Button>
         </div>

         
       
        {/* <h1>{curremail}</h1> */}

        <div style={{marginTop: "50px" , marginLeft: "60px"}}>
      </div>
        </div>
        <div >
        <InputLabel  style = {{marginLeft: "60px" , color: "black"}}  id="demo-multiple-checkbox-label">Tags</InputLabel>
        <Select
        style = {{marginLeft: "60px",marginTop: "6px" , backgroundColor: "white"}}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={this.state.tagsearch}
          // this.setState({ tagsearch: [...this.state.tagsearch, value] }) //simple value
          // onChange={(newValue) => this.setState({ value: newValue }) }
          onChange={(event) => {const {target: { value }, } = event; console.log("--> " , value[0]);
          var lentt = this.state.tagsearch.length;
          this.setState({ namesort:  "7"})
          this.setState({ tagsearch: [...this.state.tagsearch, value[lentt]] })}}
      
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {alltagslist.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={this.state.tagsearch.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        
        {/* tags testing */}
        {/* <div>
        {alltagslist.map((name) => (
           <h4> {name} </h4>
          ))}
        </div> */}
        {/* <h4> {curremail} </h4> */}
        
        {/* <h4> {this.state.tagsearch} </h4> */}

                
        </div>
        <div style={{display: "flex" ,  flexWrap: "wrap"}}>
        {mysubgres.filter((val) => {

          if(this.state.fuzzvalue == ""){

        if(this.state.value == ""){
            if(this.state.namesort == "1"){
                mysubgres.sort(function (a, b) {
                  if (a.Name < b.Name) {
                    return -1;
                  }
                  if (a.Name > b.Name) {
                    return 1;
                  }
                  return 0;
                });
            }

            if(this.state.namesort == "2"){
                mysubgres.sort(function (a, b) {
                  if (a.People.length < b.People.length) {
                    return -1;
                  }
                  if (a.People.length > b.People.length) {
                    return 1;
                  }
                  return 0;
                });
            }

            if(this.state.namesort == "7"){
                var strarr = val.Tags.split(',');
                console.log("the string of tags --->" ,  strarr)
                console.log("my selected array --->" ,  this.state.tagsearch)

                let checker = (arr, target) => target.every(v => arr.includes(v));

                if(checker(strarr, this.state.tagsearch)){
                  return val;
                }
            }

            if(this.state.namesort == "3"){
             return val;
             {/* console.log("ndvjenv"); */}
                {/* mysubgres = this.state.creationdatesearch;                 */}
            }
     
            if(this.state.namesort == "0" || this.state.namesort == "1" || this.state.namesort == "2"){
              
              return val;
            }
        }else if (val.Name.toLowerCase().includes(this.state.value.toLowerCase())){
            return val;
        }}
        else{
          // write the code for fuzz value here
          const fuse = new Fuse(mysubgres, { 
            keys: ["Name"]    
          });     
          const result = fuse.search(this.state.fuzzvalue);
          const finalResult = [];
          if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item.Name);
      });}

      for(let i = 0 ; i< finalResult.length ; i++){
        var tempstr = finalResult[i];
        var updtemp = tempstr.toLowerCase();
        finalResult[i] = updtemp;
      }

        console.log(finalResult)
          
          if (finalResult.includes(val.Name)){
            return val;
          }
        }
        }).map((course, index) => {
              return (
                <div onClick={() => { redirectsubgre(course) }} style={mystyle1} key={index}>
                <h2 style={{color: "Black" , marginLeft: "10px"}} > {index + 1} </h2>
                {/*  Number of people in the Sub Greddiit */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "12px",  fontSize: "20px" }}> No. of People:    {course.People.length} </Label>
                {/* Number of posts posted in the Sub Greddiit until now */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "12px",  fontSize: "20px" }}> No. of Posts:    {course.Posts.length} </Label>
                {/* Name */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "12px",  fontSize: "20px" }}> Name:    {course.Name} </Label>
                {/* Description */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "12px",  fontSize: "20px" }}> Description:    {course.Description} </Label>
                {/* Banned Keyword */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "12px",  fontSize: "20px" }}>  Banned Keyword:    {course.Bannedkeywords} </Label>
                {/* Tags */}
                <Label style={{color: "Black",marginLeft: "10px", marginTop: "12px",  fontSize: "20px" }}> Tags:    {course.Tags} </Label>
                
                <Button disabled={course.Moderators.includes(curremail) || (!course.People.includes(curremail))} onClick={() => { delsubgre({course}) }} style={{marginLeft: "12%", marginTop: "15px",  fontSize: "14px" }}  variant="contained">
                 Leave
                 </Button>

                 <Button disabled={course.People.includes(curremail)} onClick={() => { joinreq({course}) }} style={{marginLeft: "12%", marginTop: "15px",  fontSize: "14px" }}  variant="contained">
                 Join 
                 </Button>

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

export default withRouter(globalsubgrepg);