//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const correctPass = 'ILoveProgramming';

function getHomepage(req, res, next){
    res.sendFile(__dirname + "/public/index.html");
}

function getSecretPage(req, res, next){
    if (req.body['password'] === correctPass) 
        res.sendFile(__dirname + "/public/secret.html");
    else res.redirect("/");
}

app.get("/", getHomepage);
app.post("/check", getSecretPage);

app.listen(port, (req, res) =>{
    console.log(`Server Up and Running on Port ${port}`);
});