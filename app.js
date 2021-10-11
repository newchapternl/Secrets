const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Router = require("./routes/routes");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}

// Database settings
// const username = "murat";
// const password = "jZXOhNQ84PVhOcz2lZUO";
// const cluster = "freecluster.zvrl9";
// const dbname = "blogDB";

mongoose.connect(
  // `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  `mongodb://localhost:27017/userDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
// End database settings

app.use(Router);

app.listen(port, () => {
  console.log("Server has started successfully");
});
