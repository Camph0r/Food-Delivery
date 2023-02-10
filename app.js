const express = require("express");
require('dotenv').config()
const https = require("https");


const app = express();
app.use(express.static("resources"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});





app.post("/",  (req, res) =>{
   const name = req.body.name;
   const eMail = req.body.email;
   const textField = req.body.textfield;
   const data = {
       members: [
           {
             email_address: eMail, status: "subscribed",
             merge_fields: {
                 NAME: name,
                 TEXT: textField
             }  
           }
       ]
   };
   const jsonData = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/e31d39c7ea";
const options = {
    method: "POST",
    auth: process.env.AUTH
}
   const request = https.request(url, options, (response)=>{
     if  (response.statusCode === 200)
     {
        res.sendFile(__dirname + "/index.html");
     }
    else{
        res.send("Error!!\n Try again later.")
    }
response.on("data", (data)=>{
    console.log(JSON.parse(data));
})
   });
   request.write(jsonData);
   request.end();
});



app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server woo");
});

 