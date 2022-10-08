const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function (req,res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]
    };

    let jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/50cad6ded6";

    const option = {
        method: "POST",
        auth: "temp6735@gmail.com:58858938bdf7cf7c60fbc43c12dd596a-us21",
    }
    
    const request = https.request(url, option, function (response) {
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req,res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function () {
    console.log("Server running on port 3000.")
});



//58858938bdf7cf7c60fbc43c12dd596a-us21

//50cad6ded6