const mongoose = require("mongoose");

let Savedpostdata = new mongoose.Schema(
  {
    emailofuser: {
      type: String,
      required: true,
    },

    Postarr: {
        type: Array,
        required: true,
    },

    subggreditid: {
      type: String,
      required: true,
  },


  },

  {
    collection: "Savedpostdata"
  }
);

module.exports = mongoose.model("Savedpostdata", Savedpostdata);
