const router = require("express").Router();
let USERDATA = require("../models/userdetails");
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

  // TO ADD THE USER DETAILS
  // *********************************************************************************
router.post( "/registeradd",(req, res) => {
      console.log("reached the registeradd function here");
      console.log("body is " , req.body);

      let userdata = new USERDATA({
        FirstName: req.body.fname,
        Lastname: req.body.Lname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        Username: req.body.Uname,
        Age: req.body.age,
        Contactno: req.body.ctnum,
        type: "user",
        followers: [],
        followings: [],
      });
  
      // console.log(" here is ", userdata);
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }


      // CHECK IF THE USER ALREADY EXIST
      USERDATA.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          return res.json(err);
        }
  
        // console.log("user is : --> ", user);
        
        if (user) {
          return res.json({ data: "Exists" });
        }
        else{
          userdata
        .save()
        .then(data => {
          res.status(200).json({ User: "User added successfully" });
        })
        .catch(err => {
          console.log("yep", err);
          res.status(400).send(err);
        });
        }
      });
      // CHECK IF THE USER ALREADY EXIST

      
    }
  );
  // *********************************************************************************

  // TO CHECK THE LOGIN DETAILS
  // *********************************************************************************
  router.post("/logincheck", (req, res) => {

    console.log("here we are in the logincheck function");
    console.log("the data we got is", req.body);
    let email = req.body.email;
    let password = req.body.password;
  
  
    console.log(email, password);
    
    USERDATA.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.json(err);
      }

      console.log("user is : --> ", user);
      
      if (!user) {
        return res.json({ data: "Invalid Credentials" });
      }

      console.log(password, user.password);
      
      if (
        user &&
        bcrypt.compareSync(password, user.password) 
      ) {
          console.log("You have entered correct credentials!");

        const payload = {
          FirstName: user.FirstName,
          LastName: user.Lastname,
          username: user.Username,
          age: user.Age,
          contactno: user.Contactno,
          email: user.email,
          type: user.type,
          followers: user.followers,
          followings: user.followings,
        };
  
        console.log(process.env.SECRET_OR_KEY);
        console.log(payload);
        token = jwt.sign(payload, process.env.SECRET_OR_KEY);
        res.send(token);

      } else {
        console.log("You have entered WRONG credentials!");
        res.json({ data: "Invalid Credentials" });
      }
    });
  });
  // *********************************************************************************

  // TO EDIT THE USER DETAILS
  // *********************************************************************************
  router.post( "/updateedit",(req, res) => {
    console.log("reached the updateedit function here");
    console.log("body is here in mongodb " , req.body);


    const filter = { email: req.body.email };
    console.log(filter);

    USERDATA.findOneAndUpdate(filter, { Age: req.body.age , FirstName: req.body.fname, Lastname: req.body.Lname,Username: req.body.Uname, Contactno: req.body.ctnum}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    });
    
  }
);
// *********************************************************************************


// TO PROVIDE THE USER DETAILS TO DISPLAY IN THE PROFILE PAGE
// *********************************************************************************
  router.post( "/getuserdata",(req, res) => {
    console.log("reached the getuserdata function here");
    console.log("body is here in mongodb " , req.body);
    
    USERDATA.find({ email: req.body.email}, function (err, docs) {
      if (err){
          console.log(err);
          res.status(400);
      }
      else{
          // console.log("First function call : ", docs);
          // console.log(typeof(docs));
          res.status(200).json(docs);
      }
    });   
  }
);
// *********************************************************************************

// TO DELETE A ITEM FROM THE FOLLOWERS LIST
// *********************************************************************************
  router.post( "/delfromlist",(req, res) => {
    console.log("reached the delfromlist function here");
    console.log("body is here in mongodb " , req.body);

    const filter = { email: req.body.email };
    console.log(filter);

    USERDATA.findOneAndUpdate(filter, { followers: req.body.arrayupd}, {upsert: true}, function(err, doc) {
      // if (err) return res.send(500, {error: err});
      // return res.send('Succesfully saved.');
    });
    
    function arrayRemove(arr, value) {
      return arr.filter(function(temp){
          return temp !== value;
      });
    }

    USERDATA.find({ email: req.body.emailoffollower}, function (err, docs) {
      if (err){
          console.log(err);
          res.status(400);
      }
      else{
        var temparr = docs[0].followings
        console.log(temparr)
        var result = arrayRemove(temparr, req.body.email);
        console.log(result)

        USERDATA.findOneAndUpdate({ email: req.body.emailoffollower}, { followings: result}, {upsert: true}, function(err, doc) {
          if (err) return res.send(500, {error: err});
          return res.send('Succesfully saved.');
        });

          // console.log("First function call : ", docs);
          // console.log(typeof(docs));
          // res.status(200).json(docs);
      }
    });   

    
  }
);
// *********************************************************************************

// TO DELETE A ITEM FROM THE FOLLOWERS LIST
// *********************************************************************************
router.post( "/delfromlist2ver",(req, res) => {
  console.log("reached the delfromlist function here");
  console.log("body is here in mongodb " , req.body);

  const filter = { email: req.body.email };
  console.log(filter);

  USERDATA.findOneAndUpdate(filter, { followings: req.body.arrayupd}, {upsert: true}, function(err, doc) {
    // if (err) return res.send(500, {error: err});
    // return res.send('Succesfully saved.');
  });
  
  function arrayRemove(arr, value) {
    return arr.filter(function(temp){
        return temp !== value;
    });
  }

  USERDATA.find({ email: req.body.emailoffollower}, function (err, docs) {
    if (err){
        console.log(err);
        res.status(400);
    }
    else{
      var temparr = docs[0].followers
      console.log(temparr)
      var result = arrayRemove(temparr, req.body.email);
      console.log(result)

      USERDATA.findOneAndUpdate({ email: req.body.emailoffollower}, { followers: result}, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
      });

        // console.log("First function call : ", docs);
        // console.log(typeof(docs));
        // res.status(200).json(docs);
    }
  });   

  
}
);
// *********************************************************************************


// TO PROVIDE THE USER DETAILS TO DISPLAY IN THE PROFILE PAGE
// *********************************************************************************
router.post( "/getinfinitedata",(req, res) => {
  console.log("reached the getinfinitedata function here");
  console.log("body is here in mongodb " , req.body);

  USERDATA.find({ email: req.body.email}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("First function call : ", docs);
        res.send(docs);
    }
  });   
}
);
// *********************************************************************************

// TO MAKE ONES FOLLOWER OF ANOTHER 
// *********************************************************************************
router.post( "/makefollowers",(req, res) => {

  console.log("body is here in mongodb " , req.body.currentuseremail);
  console.log("body is here in mongodb " , req.body.tofollowemail);

//   USERDATA.update(
//     { email: req.body.currentuseremail }, 
//     { $push: {  followings: req.body.tofollowemail } },
//     done
// );

USERDATA.findOneAndUpdate(
   { email: req.body.currentuseremail }, 
   { $push: { followings: req.body.tofollowemail  } },
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });


    USERDATA.findOneAndUpdate(
      { email: req.body.tofollowemail }, 
      { $push: { followers: req.body.currentuseremail  } },
     function (error, success) {
           if (error) {
               console.log(error);
           } else {
               console.log(success);
           }
       });


  // USERDATA.find({ email: req.body.email}, function (err, docs) {
  //   if (err){
  //       console.log(err);
  //   }
  //   else{
  //       console.log("First function call : ", docs);
  //       res.send(docs);
  //   }
  // });   
}
);
// *********************************************************************************

module.exports = router;