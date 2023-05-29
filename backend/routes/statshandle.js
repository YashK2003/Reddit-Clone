const router = require("express").Router();
let Statdata = require("../models/stats");
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

// CHECKS WHETHER THE DATE EXISTS OR CREATE THE DATE IF NOT
// *********************************************************************************
router.post( "/checkdateexists",(req, res) => {
    console.log("reached the getsubgredata function here");
    console.log("-----> " , req.body);
    // CHECK WHETHER THE DATE ENTRY EXISTS OR NOT
    // myData = {date: "9-2-2023" , subggreditid: req.body.sbid};
    myData = {date: req.body.datetoday , subggreditid: req.body.sbid};
    Statdata.exists(myData,(error, result)=>{
        if (error){
          console.log(error)
        } else {
            console.log(result);
        //   console.log("result:", result)  //result is true if myData already exists
            if(result == false){
                let newreport = new Statdata({
                    // date: "9-2-2023",
                    date: req.body.datetoday,
                    subggreditid: req.body.sbid,
                    newusers: 0,
                    leftusers: 0,
                    newposts: 0,
                    numberofvisitors: 0,
                    deletedposts: 0,
                    reportedposts: 0,
                  });

                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                  }
                
                  newreport
                    .save()
                    .then(data => {
                        res.status(200).json({ Product: "Product added successfully" });
                      })
                      .catch(err => {
                        console.log("yep", err);
                        res.status(400).send(err);
                      });
            }  
            else{
                res.status(200).json({ Product: "Product added successfully" });
            }          
        }
      });
     
  }
  );

// *********************************************************************************

// TO ADD THE STATS FIELDS NEWUSER
// *********************************************************************************
router.post( "/incrementusers",(req, res) => {

    console.log("inside incerement user !!!" , req.body);
    Statdata.find({date: req.body.datetoday , subggreditid: req.body.sbid} , function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            // console.log("my data to send is:", docs);
            // console.log(docs[0])
            var temp = docs[0].newusers + 1;
            // console.log(temp)        
            // update
            const filter = {date: req.body.datetoday , subggreditid: req.body.sbid};
            Statdata.findOneAndUpdate(filter, { newusers: temp}, {upsert: true}, function(err, doc) {
              if (err) return res.send(500, {error: err});
              return res.send('Succesfully saved.');
            }); 
        }
      });
    }
);
// *********************************************************************************

// TO ADD THE REPORTED STATS
// *********************************************************************************
router.post( "/incrementreports",(req, res) => {

    // console.log("inside incerement user !!!" , req.body);
    Statdata.find({date: req.body.datetoday , subggreditid: req.body.sbid} , function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            // console.log("my data to send is:", docs);
            // console.log(docs[0].newusers)
            var temp = docs[0].reportedposts + 1;
            console.log(temp)        
            // update
            const filter = {date: req.body.datetoday , subggreditid: req.body.sbid};
            Statdata.findOneAndUpdate(filter, { reportedposts: temp}, {upsert: true}, function(err, doc) {
              if (err) return res.send(500, {error: err});
              return res.send('Succesfully saved.');
            }); 
        }
      });
    }
);
// *********************************************************************************

// TO ADD THE DELETED REPORTED POSTS STATS
// *********************************************************************************
router.post( "/incdeletedreports",(req, res) => {

  // console.log("inside incerement user !!!" , req.body);
  Statdata.find({date: req.body.datetoday, subggreditid: req.body.sbid}, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          var temp = docs[0].deletedposts + 1;
          console.log(temp)        
          // update
          const filter = {date: req.body.datetoday , subggreditid: req.body.sbid};
          Statdata.findOneAndUpdate(filter, { deletedposts: temp}, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
          }); 
      }
    });
  }
);
// *********************************************************************************


// TO PROVIDE ALL STATS 
  // *********************************************************************************
  router.post( "/getallstats",(req, res) => {
    console.log("in get all stats : " , req.body);


    Statdata.find({  subggreditid: req.body.subid} , function (err, docs) {
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

// TO DELETE ALL DATA RELATED TO A SUBGREDDIT
  // *********************************************************************************
  router.post( "/deletesubgredata",(req, res) => {
    // console.log("in get all stats : " , req.body.subgreid);

    Statdata.remove({ _id: req.body.subgreid}, function(err) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  });  
  }
  );
  // *********************************************************************************


// TO ADD THE POSTS NUMBER IN STATS 
// *********************************************************************************
router.post( "/inconaddposts",(req, res) => {

  // console.log("inside incerement user !!!" , req.body);
  Statdata.find({date: req.body.datetoday, subggreditid: req.body.sbid}, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          var temp = docs[0].newposts + 1;
          console.log(temp)        
          // update
          const filter = {date: req.body.datetoday , subggreditid: req.body.sbid};
          Statdata.findOneAndUpdate(filter, { newposts: temp}, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
          }); 
      }
    });
  }
);
// *********************************************************************************

// TO ADD THE NUMBER OF VISITORS IN STATS
// *********************************************************************************
router.post( "/incnumvisitors",(req, res) => {

  console.log("inside incnumvisitors !!!" , req.body);
  Statdata.find({date: req.body.datetoday, subggreditid: req.body.sbid}, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          var temp = docs[0]. numberofvisitors + 1;
          console.log(temp)        
          // update
          const filter = {date: req.body.datetoday , subggreditid: req.body.sbid};
          Statdata.findOneAndUpdate(filter, {  numberofvisitors: temp}, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
          }); 
      }
    });
  }
);
// *********************************************************************************




module.exports = router;