const mongoose = require("mongoose");

let Statdata = new mongoose.Schema(
  {
    date: {
        type: String,
        required: true,
    },

    subggreditid: {
        type: String,
        required: true,
    },

    newusers: {
        type: Number,
        required: true,
    },

    leftusers: {
        type: Number,
        required: true,
    },

    newposts: {
        type: Number,
        required: true,
    },

    numberofvisitors: {
        type: Number,
        required: true,
    },

    reportedposts: {
        type: Number,
        required: true,
    },

    deletedposts: {
      type: Number,
      required: true,
  },

  },

  {
    collection: "Statdata"
  }
);

module.exports = mongoose.model("Statdata", Statdata);
