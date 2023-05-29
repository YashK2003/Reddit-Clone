const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to mongodb
mongoose.connect("mongodb+srv://yashkawade:sG7geKB3E3CoYY3Z@test.h09tbqu.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully.");
});

// API endpoints

// const datarouting = require("./routes/handledata");
// app.use("/data", datarouting);

const userdatarouting = require("./routes/userdata");
app.use("/data", userdatarouting);

const authrouting = require("./routes/auth");
app.use("/auth", authrouting);

const subgrerouting = require("./routes/subgrehandle");
app.use("/data", subgrerouting);

const savedpostrouting = require("./routes/savedposthandle");
app.use("/data", savedpostrouting);

const reportrouting = require("./routes/reporthandle");
app.use("/data", reportrouting);

const statrouting = require("./routes/statshandle");
app.use("/data", statrouting);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
