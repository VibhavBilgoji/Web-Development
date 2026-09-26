import express from "express";
import axios from "axios";
import e from "express";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "TallGuy69";
const yourPassword = "12341234";
const yourAPIKey = "3b3b5675-59f4-4564-a01d-e50c6c0f1db2";
const yourBearerToken = "d0afb636-0edd-4578-86b9-f5326ba2aa6f";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random`);

    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    const errorMsg = error.message;
    console.error("Failed to make request:", errorMsg);
    res.status(404).send("Error: ", errorMsg);
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}all`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });

    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    const errorMsg = error.message;
    console.error("Failed to make request:", errorMsg);
    res.status(404).send("Error: ", errorMsg);
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}filter`, {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });

    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    const errorMsg = error.message;
    console.error("Failed to make request:", errorMsg);
    res.status(404).send("Error: ", errorMsg);
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  const id = 42;
  try {
    const response = await axios.get(`${API_URL}secrets/${id}`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });

    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    const errorMsg = error.message;
    console.error("Failed to make request:", errorMsg);
    res.status(404).send("Error: ", errorMsg);
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: {
      Authorization: `Bearer <YOUR TOKEN HERE>`
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
