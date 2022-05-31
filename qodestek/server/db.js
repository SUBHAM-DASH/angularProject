const mongoose = require("mongoose");

const mongoURI =
  "mongodb://localhost:27017/qodestek?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectTOmongoose = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongoose successfully");
  });
};
module.exports = connectTOmongoose;
