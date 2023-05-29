const router = require("express").Router();
let Savedpostdata = require("../models/savedpost");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.route("/").get((req, res) => {
    USERDATA.find(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
        console.log("in the route" , data);
      }
    });
  });


  // TO ADD THE SAVEDPOST DETAILS
  // *********************************************************************************
  router.post( "/addsavedpost",(req, res) => {
    // console.log("reached the subgreadd function here");
    // console.log("body is " , req.body);

    let newsavedpost = new Savedpostdata({
      emailofuser: req.body.useremail,
      Postarr: req.body.mypost,
      subggreditid: req.body.subgreid,
    });

    // console.log(" here is my newsavedpost ->   ", newsavedpost);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    newsavedpost
      .save()
      .then(data => {
        res.status(200).json({ Product: "Product added successfully" });
      })
      .catch(err => {
        console.log("yep", err);
        res.status(400).send(err);
      });
  }
);
// *********************************************************************************

// TO PROVIDE ALL SAVEPOSTS WITH THE GIVEN EMAIL AS USER
  // *********************************************************************************
  router.post( "/getsavedposts",(req, res) => {
    // console.log("reached the getsubgredata function here");
    // console.log("-----> " , req.body);
    
    Savedpostdata.find({ emailofuser: req.body.email } , function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          // console.log("my data to send is:", docs);
          res.send(docs);
      }
    });   
  }
  );
  // *********************************************************************************

// TO DELETE THE SAVED POST
  // *********************************************************************************
  router.post( "/deletesavedpost",(req, res) => {
    // console.log("reached the getsubgredata function here");
    console.log("-----> in deletesavedpost" , req.body.mainid);
    Savedpostdata.remove({ _id: req.body.mainid}, function(err) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  });
    
  }
  );
  // *********************************************************************************


  // TO DELETE THE SAVED POST WHEN SUBGREDIT DELETED
  // *********************************************************************************
  router.post( "/delwhensubgredel",(req, res) => {
    // console.log("reached the getsubgredata function here");
    console.log("\n-----> in delwhensubgredel <-------------\n" , req.body.mainid);
    Savedpostdata.remove({ subggreditid: req.body.mainid}, function(err) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  });
    
  }
  );
  // *********************************************************************************



module.exports = router;