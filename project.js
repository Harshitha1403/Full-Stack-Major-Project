const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
var express = require("express");
var app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
//app.set("view engine", "ejs");

/*app.get("/", function (req, res) {
  res.sendFile(__dirname+"home.html");
});*/
/*app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});*/
app.get("/loginnew", function (req, res) {
  res.sendFile(__dirname+ "/login.html");
});
app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});
/*app.get("/signupSubmit", function (req, res) {
 // console.log(req.query.emailid);

  db.collection("users").add({
    email: req.query.emailid,
    firstname: req.query.firstname,
    lastname: req.query.lastname,
  });
});*/

app.get("/signupsubmit", (req, res) => {
  const Name = req.query.username;
  const Email = req.query.email;
  const Phone = req.query.phone;
  const Password = req.query.pswd;
  db.collection("Customers")
    .add({
      Name: Name,
      Email: Email,
      Phone: Phone,
      Password: Password,
    })
    .then(() => {
      res.sendFile(__dirname+"/login.html");
    });
});

app.get("/loginSubmit", (req, res) => {
  const Username = req.query.username;
  // console.log("Email",Email);
  const Password = req.query.pswd;
  // console.log("Password",password);
  db.collection("Customers")
    .where("Name", "==", Username)
    .where("Password", "==", Password)
    .get()
    .then((docs) => {
      //console.log(docs.size);
      if (docs.size > 0) {
        res.sendFile( __dirname+"/screenshot.html");
      } else {
        res.send("Login Failed");
        // res.alert("Invalid Username or Password");
      }
    });
});

/*db.collection('users').where("email","==",req.query.emailid)
  if(docs.length>0)
});*/

app.listen(3000);
// localhost:3000