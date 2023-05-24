const { request } = require("printful-request");

const getorders = async (req, res) => {
  request("orders", {
    token: process.env.PRINTFUL_PRIVATE_TOKEN,
  })
    .then(({ result }) => {
      console.log(result);
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        status: "error",
        data: err,
      });
    });
};

module.exports = getorders;
