const express = require("express");
const {
  awsupload,
  runpodupload,
  getproducts,
  createproduct,
  getorders,
  orderfullfilment,
  awsavatar,
  checkstatus,
} = require("../controller");
const router = express.Router();

// post
router.post("/api/awsupload", awsupload);
router.post("/api/runpodupload", runpodupload);
router.post("/api/awsavatar", awsavatar);

// get
router.get("/", (req, res) => {
  res.send("SHOPIFY Backend");
});
router.get("/api/getproducts", getproducts);
router.get("/api/getorders", getorders);
router.get("/api/checkstatus/:id", checkstatus);

// put
router.get("/api/orderfullfilment/:id", orderfullfilment);

module.exports = router;
