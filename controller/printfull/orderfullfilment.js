const { request } = require("printful-request");

const orderfullfilment = async (req, res) => {
  const { id } = req.params;
  
  request(`orders/${id}/confirm`, {
    token: process.env.PRINTFUL_PRIVATE_TOKEN,
    params: { store_id: 10571185 },
  })
    .then((result) => {
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

module.exports = orderfullfilment;
