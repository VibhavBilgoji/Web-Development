import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  let bandName = `<h1></>Your Band name is: </h1><h2>${req.body.street}${req.body.pet}🔥</h2>`;
  res.send(bandName);
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});