import * as React from 'react';
// import Popover from '@mui/material/Popover';
import Typography from "@material-ui/core/Typography";
import { Popover } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import { useId, useState } from 'react';
import axios from "axios";

export default function BasicPopover({parapass , mycurrentemail}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input, setInput] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const myreportcall = () => {
    console.log("para is : " , input);
    console.log(mycurrentemail);
    
    // console.log("in reportpost post - > " , para.course);
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  var current = new Date();
  var currentdate = current.toString();
  const detailsobj = {
    postarray:  parapass,
    reportedby: mycurrentemail,
    concern: input,
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
//   // ***************************** FOR STATS REPORT **************************
//   console.log(detailsobj);
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

  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Report
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography component={'span'} sx={{ p: 2 }}>
        Concern : 
        <input type="text"  onInput={e => {setInput(e.target.value)}}/>
            <Button
              style={{margin: "10px"}}
              onClick={() =>  myreportcall() }
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
            
        </Typography>
      </Popover>
    </div>
  );
}
