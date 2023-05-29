const router = require("express").Router();
let Reportdata = require("../models/reports");
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
  router.post( "/addreportedpost",(req, res) => {
    // console.log("reached the subgreadd function here");
    // console.log("body is " , req.body);
    let newreport = new Reportdata({
      Postarr: req.body.postarray,
      Reportedby: req.body.reportedby,
      concern: req.body.concern,
      subgredditid: req.body.subgid,
      dateofrepo: req.body.dateofreport,
      displayusername: req.body.postarray.postedby,
      isignored: "0"
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // console.log(newsavedpost);

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
);
// *********************************************************************************

// TO PROVIDE ALL SAVEPOSTS WITH THE GIVEN ID OF SUBGREDDIT
  // *********************************************************************************
  router.post( "/getreportedposts",(req, res) => {
    // console.log("reached the getsubgredata function here");
    // console.log("-----> " , req.body.subgid);
    
    Reportdata.find({ subgredditid: req.body.subgid } , function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          var tempdate = new Date();
          let daytoday = tempdate.getDate();
          let monthtoday = tempdate.getMonth() + 1;
          let yeartoday = tempdate.getFullYear();
        
         var todelete = [];
          for(let i = 0 ; i < docs.length; i++){
            // console.log(docs[i].dateofrepo);.
            var date1 = new Date(docs[i].dateofrepo);
            let day1 = date1.getDate();
            let month1 = date1.getMonth() + 1;
            let year1 = date1.getFullYear();
          
            // console.log("year- >" , yeartoday - year1)
            // console.log("month- >" , monthtoday - month1)
            // console.log("days- >" , daytoday - day1) 
            // console.log("===========\n");
            if( (yeartoday - year1) > 0){
              todelete.push(docs[i]._id)
              continue;
            }

            if( (monthtoday - month1) > 0){
              todelete.push(docs[i]._id)
              continue;
            }

            if((daytoday - day1) > 8){
              todelete.push(docs[i]._id)
              continue;
            }
          }

          for(let i = 0 ; i < todelete.length ; i++){
            Reportdata.remove({ _id: todelete[i]}, function(err) {
          });
          console.log(todelete[i]);
          
          }

          // console.log("-> here" , todelete)


          res.send(docs);
      }
    });   
  }
  );
  // *********************************************************************************

// TO UPDATE THE IGNORED VALUE OF THE REPORTED POST
  // *********************************************************************************
  router.post( "/ignoredreport",(req, res) => {
    // console.log("reached the getsubgredata function here");
    console.log("-----> " , req.body);
    const filter = { _id: req.body.mainid };
    Reportdata.findOneAndUpdate(filter, { isignored: req.body.parameter}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    });
  }
  );
  // *********************************************************************************

// TO DELETE THE REPORTED POST
  // *********************************************************************************
  router.post( "/deletereport",(req, res) => {
    // console.log("reached the getsubgredata function here");
    // console.log("-----> " , req.body.mainid);
    Reportdata.remove({ _id: req.body.mainid}, function(err) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  });
    
  }
  );
  // *********************************************************************************


module.exports = router;