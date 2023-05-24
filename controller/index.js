const runpodupload = require("./runpod/runpodupload");
const awsupload = require("./aws/awsupload");
const getproducts = require("./printfull/getproducts");
const createproduct = require("./printfull/createproduct");
const getorders = require("./printfull/getorders");
const orderfullfilment = require("./printfull/orderfullfilment");
const awsavatar = require("./aws/awsavatar");
const checkstatus = require("./runpod/checkstatus");

module.exports = {
  checkstatus,
  awsupload,
  runpodupload,
  getproducts,
  createproduct,
  getorders,
  orderfullfilment,
  awsavatar
};
