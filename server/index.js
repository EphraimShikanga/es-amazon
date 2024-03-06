const express = require("express");
const request = require("request-promise");
const dotenv =  require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT;

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


const apiKey = process.env.API_KEY;

const baseUrl = `http://api.scraperapi.com/?api_key=${apiKey}&autoparse=true`;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon scraper API");
});

// Get Product details

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get Search Results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/s?k=${searchQuery}`
    );
    const parsedResponse = JSON.parse(response);
    const sortedResults = sortResults(parsedResponse.results);
    const top10Results = sortedResults.slice(0, 20);
    res.json({ results: top10Results });
  } catch (error) {
    res.json(error);
  }
});

function sortResults(results) {
  return results.sort((a, b) => {
    // Sort by highest star rating
    const starsComparison = b.stars - a.stars;
    if (starsComparison !== 0) {
      return starsComparison;
    }

    // Sort by highest price
    const priceComparison = b.price - a.price;
    return priceComparison;
  });
}

// Get Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
