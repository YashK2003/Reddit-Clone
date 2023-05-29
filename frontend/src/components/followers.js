import * as React from 'react';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useState } from 'react';
const menustyle = {
  width: "200px",
  justifyContent: 'center',
}
let counter = 0;
var passemail=""
var myarr = [];

function arrayRemove(arr, value) {
  return arr.filter(function(temp){
      return temp !== value;
  });
}

function deluser(para){
  // para is the word we have to delete
  console.log("para is -> " , para);
  console.log("temparr before is -> " , myarr);
  var result = arrayRemove(myarr, para.course);
  console.log("temparr after is -> " , result);

  // DELETE THE USER FROM THE LIST OF THE USER
  const detailsobj = {
    arrayupd: result,
    email: passemail,
    emailoffollower: para.course,
    curruseremail: passemail,
  }

  console.log("posting to backend", detailsobj);
      axios
        .post("http://localhost:4000/data/delfromlist", detailsobj)
        
        .then(res => {
          console.log("added successfull");  
          window.alert("User deleted from the list successfully !!");
        })        
        .catch(err => {
          console.log("not got added"); 
          window.alert("Unable to update User details !!"); 
        });

}


export default function PositionedMenu(value) {

  passemail = value.class;
  // console.log("passemail -> " , passemail);
  // now you have email in your hand
  // get the followers array
  const [userdata, setuserdata] = useState("");
  const sendobj = {
    email: passemail
  }

var list = [0]

React.useEffect(() => {
  axios
    .post("http://localhost:4000/data/getinfinitedata", sendobj)
    .then(res => {
      if (list[0] === 0 && res.data === "Invalid Credentials") {
        console.log("invalid");
      } else if(list[0] === 0){
        if(res.data.length > 0){
        setuserdata(res.data[0].followers)
        // console.log("mydata is " , res.data[0].followers);
        }
      }
      if(list[0] === 0)
      {
        list[0]++
      }
    })
    .catch(err => {
      console.log(err);
      console.log(" ----------> lol here we got an error");
    });
  } ,list
  );

  // console.log("VALUE IS " ,userdata);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  counter = userdata.length;  
  myarr = Object.values(userdata);

  return (
    
    <div>
      <Button style = {{fontSize: "25px" , fontFamily: "Calibri" ,margin: "20px", backgroundColor: "#E8D2A6" , width: "200px" , height: "50px" }}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Followers
        <p>  &nbsp; -  &nbsp;{counter} </p>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
          {myarr.map((course, index) => {
              return (
                <MenuItem style={menustyle} key={index}>{course}
                <IconButton  onClick={() =>  deluser({course}) } aria-label="delete">
                <AiOutlineDelete  />
                </IconButton>
                </MenuItem>
                )
          })}

      </Menu>
    </div>
  );

}
