const AWS = require("aws-sdk");

const awsavatar = async (url, res, id) => {
  let image_url = await fetch(url);
  let blob = Buffer.from(await image_url.arrayBuffer());

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_AAA,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_AAA,
    region: process.env.S3_BUCKET_REGION,
  });

  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: id + `/avatar${Math.random()}.jpg`,
    Body: blob,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "error",
        data: err,
      });
    } else if (data) {
      res.status(200).json({
        status: "COMPLETED",
        data,
      });
    }
  });
};

module.exports = awsavatar;
