const router = require("express").Router();
let Subgredata = require("../models/subgreddit");
let USERDATA = require("../models/userdetails");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.route("/").get((req, res) => {
    Subgredata.find(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
        console.log("in the route" , data);
      }
    });
  });

  // TO ADD THE SUBGRE DETAILS
  // *********************************************************************************
router.post( "/subgreadd",(req, res) => {
      // console.log("reached the subgreadd function here");
      // console.log("body is " , req.body);

      var temparr = []
      var postarray = []
      //-----------------------------------------------------------------------
      
      let newsubgredata = new Subgredata({
        Name: req.body.name,
        Description: req.body.description,
        Bannedkeywords: req.body.Bankeywords,
        Tags: req.body.tags,
        Posts: postarray,
        People: req.body.People,
        Moderators: req.body.People,
        BlockedPeople: req.body.BlockedPeople,
        Requestusers: temparr
      });
  
      // console.log(" here is my subgredata ->   ", newsubgredata);
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      newsubgredata
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

  
  // TO PROVIDE ALL SUBGREES WITH THE GIVEN EMAIL AS MODERATOR
  // *********************************************************************************
  router.post( "/getsubgredata",(req, res) => {
    // console.log("reached the getsubgredata function here");
    // console.log("-----> " , req.body);
    
    Subgredata.find({ Moderators: req.body.email } , function (err, docs) {
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

  // TO PROVIDE ALL SUBGREES FOR GLOBAL PAGE OF SUBGREDDIT
  // *********************************************************************************
  router.post( "/getallsubgre",(req, res) => {

    Subgredata.find(function (err, docs) {
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

  
  // TO DELETE THE SUBGREES
  // *********************************************************************************
  router.post( "/delsubgre",(req, res) => {
    // console.log("reached the getsubgredata function here" , req.body);
    
    Subgredata.remove({ _id: req.body.subgreid}, function(err) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  });
  }
  );
  // *********************************************************************************

  // TO SEND THE DATA OF SUBGREE TO USERS PAGE 
  // *********************************************************************************
  router.post( "/showuserpage",(req, res) => {
    // console.log("reached the showuserpage function here" , req.body);
    
    Subgredata.find({ _id: req.body.idtosend } , function (err, docs) {
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

  // TO SEND THE LIST OF DETAILS OF PEOPLES FOR JOIN REQUEST PAGE
  // *********************************************************************************
  router.post( "/joinreqpg",(req, res) => {
    
      USERDATA.find({ email: {$in: req.body.arraytosend}} , function (err, docs) {
        if (err){
            console.log(err);
        }
        else{          
            res.send(docs);
         
        }
      });   
  }
  );
  // *********************************************************************************

  // TO DELETE THE USER FROM REQ ARRAY OF THE SUBGREDDIT ( PROCESS THE REJECT REQUEST )
  // *********************************************************************************
  router.post( "/rejectjoinreq",(req, res) => {
    
    // console.log("my request is: " , req.body);
    const filter = { _id: req.body.subgreid };
    // console.log(filter);

    Subgredata.findOneAndUpdate(filter, { Requestusers: req.body.userarr}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    });
   
}
);
// *********************************************************************************

// TO DELETE THE USER FROM REQ ARRAY AND ADD IT TO PEOPLE ARRAY OF THE SUBGREDDIT ( PROCESS THE ACCEPT REQUEST )
  // *********************************************************************************
  router.post( "/acceptjoinreq",(req, res) => {
    
    console.log("my request is: " , req.body);
    const filter = { _id: req.body.subgreid };
    // console.log(filter);

    Subgredata.findOneAndUpdate(filter, { Requestusers: req.body.userarr , People: req.body.peoplearray}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    });
   
}
);
// *********************************************************************************

// TO DELETE THE USER FROM PEOPLE ARRAY OF THE SUBGREDDIT ( PROCESS THE LEAVE REQUEST )
// *********************************************************************************
router.post( "/leavereq",(req, res) => {
    
  console.log("my request is: " , req.body);
  const filter = { _id: req.body.subgreid };
    // console.log(filter);

    Subgredata.findOneAndUpdate(filter, { People: req.body.emaildel , LeftUsers: req.body.leavearr}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    });

}
);
// *********************************************************************************

// *********************************************************************************
router.post( "/votesupdate",(req, res) => {
    
  console .log("my request is: " , req.body);
  const filter = { _id: req.body.subgreid };
    // console.log(filter);

    Subgredata.findOneAndUpdate(filter, { Posts: req.body.postupd}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    });

}
);
// *********************************************************************************

// TO PROCESS THE JOIN REQUEST 
// *********************************************************************************
router.post( "/joinreqglbobal",(req, res) => {
    
  console.log("my joinreqglbobal is: " , req.body);
  const filter = { _id: req.body.subgreid };
    // console.log(filter);

    Subgredata.findOneAndUpdate(filter, { Requestusers: req.body.emaildel}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    });

}
);
// *********************************************************************************

// TO PROCESS THE BLOCKED USER APPEND ARRAY REQUEST
// *********************************************************************************
router.post( "/blkarrayupdate",(req, res) => {
    
  console .log("my request is: " , req.body);
  const filter = { _id: req.body.subgreid };
    // console.log(filter);

    Subgredata.findOneAndUpdate(filter, { BlockedPeople: req.body.blkupd}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    });

}
);



// *********************************************************************************

// TO ADD THE POST IN THE SUBGREDDIT
// *********************************************************************************
  router.post( "/addpostinsubgre",(req, res) => {
    console.log("reached the addpostinsubgre function here" , req.body);
    Subgredata.update(
      { _id: req.body.subgreid }, 
      { $push: { Posts: req.body.postobj } },
      function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
      });
  }
  );
// *********************************************************************************






module.exports = router;