import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "duckmysih",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();
let countryCodes;
app.get("/", async (req, res) => {
  try {
    const queryResult = await db.query(
      "SELECT country_code FROM visited_countries",
    );
    countryCodes = queryResult.rows.map((country) => country.country_code); //for each element
    res.render("index.ejs", {
      countries: countryCodes,
      total: countryCodes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data.");
  }
});

app.post("/add", async (req, res) => {
  const countryInput = req.body.country.trim().toLowerCase();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [countryInput],
    );

    if (result.rows.length > 0) {
      const countryCode = result.rows[0].country_code;
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [countryCode],
        );
        // Success: Redirect and stop.
        return res.redirect("/");
      } catch (error) {
        // This handles the duplicate country error.
        console.log("Duplicate country error caught.");
        return res.render("index.ejs", {
          countries: countryCodes,
          total: countryCodes.length,
          error: "Country has already been added, try again.",
        });
      }
    } else {
      // FIX: This 'else' block handles the case where the country does not exist.
      return res.render("index.ejs", {
        countries: countryCodes,
        total: countryCodes.length,
        error: "Country does not exist, try again.",
      });
    }
  } catch (err) {
    // This outer catch is now for truly unexpected database errors.
    console.error(err);
    return res.render("index.ejs", {
      countries: countryCodes,
      total: countryCodes.length,
      error: "An unexpected database error occurred.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" ");
}
