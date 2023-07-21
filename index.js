//jshint esversion:6
import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
app.use(bodyParser.urlencoded({extended:true}));

var userIsAuthorised = false;

function passwordCheck(req,res,next){
    const password = req.body["password"];
    if (password === "ILoveProgramming"){
        userIsAuthorised = true;
    }
    next();
}

app.use(passwordCheck);

app.post("/check", (req,res) =>{
    if (userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.redirect("/")
    }
});

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.listen(3000,() => {
    console.log("the server is running on port 3000");
});