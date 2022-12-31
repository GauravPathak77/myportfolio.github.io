const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const ejs = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine" , "ejs");

app.get("/",function(req,res){
  res.render ("index");
  // res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const firstname = req.body.name;
  const lastname = req.body.message;
  const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname,

      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us13.api.mailchimp.com/3.0/lists/43450f6900";
const options = {
  method: "POST",
  auth: "Gaurav:8086e54c3b306d6b623f14f1d76b7d41-us13"
}
const request = https.request(url,options,function(response){

  // if(res.statusCode === 200){
  //   res.sendFile(__dirname + "/success.html");
  // }
  // else {
  //   res.sendFile(__dirname + "/failure.html");
  // }
response.on("data",function(data){
  console.log(statuscode);
});
});
request.write(jsonData);
res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(req,res){
  console.log("server is connected to port 3000");
});

