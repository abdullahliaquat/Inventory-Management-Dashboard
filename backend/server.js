const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const ProductRoute = require("../backend/routes/productroutes");
const cors = require("cors");


const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGODBURL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => console.log(error));

app.use("/api/products", ProductRoute);

app.listen(PORT, () => console.log("I am back again!"));
