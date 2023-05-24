const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/router");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(fileUpload());
app.use(router);

app.listen(PORT, () => console.log("Server running on port " + PORT));
