const AWS = require("aws-sdk");

const awsupload = async (req, res) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_AAA,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_AAA,
    region: process.env.S3_BUCKET_REGION,
  });

  let extension = req.files.data.mimetype;
  extension = extension.split("/");

  const s3 = new AWS.S3();

  let fileContent = Buffer.from(req.files.data.data, "binary");

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${req.files.data.name}/image${Math.random()}.${extension[1]}`,
    Body: fileContent,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "error",
        data: err,
      });
    } else if (data) {
      res.status(200).json({
        status: "success",
        data,
      });
    }
  });
};

module.exports = awsupload;
