const mongoose = require("mongoose");

let userdata = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },

    Lastname: {
        type: String,
        required: true,
    },

    Username: {
      type: String,
      required: true,
    },

    Age: {
      type: String,
      required: true,
    },

    Contactno: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    type: {
      type: String,
    },

    followers: {
      type: Array,
    },

    followings: {
      type: Array,
    }

  },

  {
    collection: "userdata"
  }
);

module.exports = mongoose.model("USERDATA", userdata);
