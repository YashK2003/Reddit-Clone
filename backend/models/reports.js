const mongoose = require("mongoose");

let Reportdata = new mongoose.Schema(
  {
    Postarr: {
        type: Array,
        required: true,
    },

    Reportedby: {
        type: String,
        required: true,
    },

    concern: {
        type: String,
        required: true,
    },

    subgredditid: {
        type: String,
        required: true,
    },

    dateofrepo: {
        type: String,
        required: true,
    },

    displayusername: {
        type: String,
        required: true,
    },

    isignored: {
      type: String,
      required: true,
  },

  },

  {
    collection: "Reportdata"
  }
);

module.exports = mongoose.model("Reportdata", Reportdata);
