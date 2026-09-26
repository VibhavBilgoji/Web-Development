import express from 'express';
const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log(`Server started on ${port}.`);
});

app.get("/", (req, res) => {
    console.log(req.rawHeaders);
    res.send(`<h1 style="color: orange">This is my Homepage</h1>`);
});

app.get("/about", (req, res) => {
    console.log(req.rawHeaders);
    res.send(`<h1 style="color: orange">About Me: Enthusiatic Web Developer</h1>`);
});

app.get("/contact", (req, res) => {
    console.log(req.rawHeaders);
    res.send(`<h1 style="color: orange">Contact Me: 9422181844 (Phone)</h1>`);
});