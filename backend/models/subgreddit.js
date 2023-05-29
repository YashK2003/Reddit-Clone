const mongoose = require("mongoose");

let Subgredata = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    Description: {
        type: String,
        required: true,
    },

    Bannedkeywords: {
      type: String,
      required: true,
    },

    Tags: {
      type: String,
      required: true,
    },

    Posts: {
      type: Array,
    },

    People: {
      type: Array,
    },

    BlockedPeople: {
      type: Array,
    },

    Moderators: {
      type: Array,
    },

    Requestusers:{
      type: Array,
    },

    LeftUsers:{
      type: Array,
    }
    

  },

  {
    collection: "Subgredata"
  }
);

module.exports = mongoose.model("Subgredata", Subgredata);
