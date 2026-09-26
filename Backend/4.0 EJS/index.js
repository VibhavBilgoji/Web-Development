import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.urlencoded({extended: true}));

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

// const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// console.log(weekday[currentDay]);
// app.set("view engine", "ejs");

function getCurrentDay(req, res){
    const today = new Date();
    const currentDay = today.getDay();

    let displayDay, message;
    if (currentDay == 6 || !currentDay){
        displayDay = 'the weekend';
        message = 'have fun';
    }
    else {
        displayDay = 'the weekday';
        message = 'work hard';
    }
    res.render("index.ejs", { day: displayDay, msg: message });
}

app.get('/', getCurrentDay);

app.listen(port, (req, res) =>{
    console.log(`Server Up and Running on Port ${port}`);
});