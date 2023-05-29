import * as React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import axios from "axios";
import { useState } from "react";
import { BiWindowOpen } from 'react-icons/bi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400px",
  height: "300px",
  // bgcolor: 'white',
  backgroundColor: "white",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicModal({postedinname , postedbyname , curruseremail}) {

  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);window.location.reload();}

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);

  console.log("postedinname -> ", postedinname);
  console.log("curruseremail -> ", curruseremail);
  console.log("banned keyword -> ", postedbyname.Bannedkeywords);

  // CHECK FOR BANNED KEYWORDS HERE 
  // ***************************************************************************
    // HERE WE DO THE BANNED KEYWORDS STUFF
    //-------------------------------------------------------------------------
    var banneddone = ""
    var changes = 0;
    var str1 = postedbyname.Bannedkeywords;
    var str = str1.split(" ").join("")
    var parts = str.split(',');
   
    // now parts contains the letters which are banned
    for(let itr = 0 ; itr < 1 ; itr++){
    // console.log( respe.data[0].Posts[itr].text)
    var mytext = data.get('text').split(" ")

                          
    // console.log("my pr/evious text is  " , mytext);
    for(let i= 0 ; i< parts.length; i++){
      for(let j=0 ; j<mytext.length ; j++){
        
        var strchk = mytext[j].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        // console.log(" ->>>>> " , strchk);
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
      banneddone = finaltext
      // temparrforban[itr].text = finaltext;
      // console.log("->" , arrayofposts[itr].text)
    }
    // console.log("g -> " , temparrforban);
    // this.setState({mypostarray: temparrforban});
    // console.log(this.state.mypostarray);
    if(changes > 0){
      window.alert("The posts contain banned words !!");
    }
    //-------------------------------------------------------------------------
    // ************************************************************************


    const postobject = {
        text: banneddone,
        postedby : curruseremail,
        postedin : postedinname,
        upvotes: "0",
        downvotes: "0",
        comments: []
    }
    const detailsobj = {
      postobj: postobject,
      subgreid: id,
    }
    // console.log(" --- > " , detailsobj);

    axios
    .post("http://localhost:4000/data/addpostinsubgre ", detailsobj)
    .then(res => {
      // window.alert("Left successfully !!");
      // window.location.reload()
    })        
    .catch(err => {
      // window.alert("Unable to leave successfully !!"); 
      window.location.reload()  
    });

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
        .post("http://localhost:4000/data/inconaddposts", obj)
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


  }

  const validate = () => {
  
    if(text.length >= 1){
      return true;
    }
    return false;
  };


  return (
    <div>
      <Button onClick={handleOpen} style ={{marginLeft: "500px" , marginTop: "40px"}} variant="contained" >CREATE POST</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <div style = {style}>
      <div style = {{backgroundColor: "white" ,margin: "auto", height: "200px" , width: "300px"}}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="text"
                  label="Add Text to create post"
                  name="text"
                  autoComplete="off"
                  onChange={(e) => setText(e.target.value)}
                />
              </Grid>
            <br/><br/><br/><br/>
            </Grid>
            <br/>
            <div style={{color: "red"}}>
            <Button
                margintop = "10px"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!validate()}
              // onClick={event => (window.location.href = "/about")}
            >
              Submit 
            </Button>
            <br/>
            </div>
            <br/>
          </Box>
          </div>
          </div>
      </Modal>
    </div>
  );
}
