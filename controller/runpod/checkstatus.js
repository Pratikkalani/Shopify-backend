const axios = require("axios");
const awsavatar = require("../aws/awsavatar");

const checkstatus = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.RUNPOD_AUTHORIZATION,
  };
  let { id } = req.params;
  id = id.split(",");

  axios
    .get(`${process.env.RUNPOD_URL}/status/${id[0]}`, {
      headers: headers,
    })
    .then((result) => {
      const resultData = result.data;
      if (resultData.status === "IN_QUEUE") {
        res.json({
          status: "IN_QUEUE",
        });
      } else if (resultData.status === "IN_PROGRESS") {
        res.json({
          status: "IN_PROGRESS",
        });
      } else if (resultData.status === "COMPLETED") {
        awsavatar(resultData.output, res, id[1]);
      }
    })
    .catch((error) => {
      console.log(error, " error");
      res.json({
        data: error,
        status: "error",
      });
    });
};

module.exports = checkstatus;
