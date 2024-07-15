const mongoose = require("mongoose");

const mongoURI =
  "mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true&ssl=false";

const connectToMongo = () => {
  mongoose.connection.on("connected", () => console.log("Connected"));
  mongoose.connection.on("open", () => console.log("Open"));
  mongoose.connection.on("disconnected", () => console.log("Disconnected"));
  mongoose.connection.on("reconnected", () => console.log("Reconnected"));
  mongoose.connection.on("disconnecting", () => console.log("Disconnecting"));
  mongoose.connection.on("close", () => console.log("Close"));

  mongoose.connect(mongoURI);
};

module.exports = connectToMongo;
