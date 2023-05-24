const axios = require("axios");
const Jimp = require("jimp");

const runpodupload = (req, res) => {
  const operation = "hed"; // t2i

  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.RUNPOD_AUTHORIZATION,
  };

  if (operation === "hed") {
    Jimp.read(req.files.data.data)
      .then((image) => {
        image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          if (err) throw err;
          const imageData = buffer.toString("base64");
          // Load and process the style images in the same way...
          // ...
          // Define the request data
          const data = {
            input: {
              // a_prompt: "best quality, extremely detailed",
              n_prompt:
                "out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature",
              // num_samples: 1,
              // image_resolution: 512,
              // ddim_steps: 20,
              // scale: 9,
              // seed: null,
              // eta: 0,
              // low_threshold: 100,
              // high_threshold: 200,
              image_base64: imageData,
              // image_url:
              //   "https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg",
              prompt: "photo of a man",
            },
          };

          // Make the POST request
          axios
            .post(process.env.RUNPOD_URL + "/run", data, {
              headers,
            })
            .then(async (response) => {
              // Check if the request was successful
              if (response.status === 200) {
                const responseData = response.data;

                res.status(200).json({
                  status: "success",
                  data: responseData,
                });
              } else {
                console.log(
                  `Request failed with status code ${response.status}`
                );
                res.status(400).json({
                  data: response,
                  status: "error",
                  message: "post image then error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json({
                data: error,
                status: "error",
                message: "post image catch error",
              });
            });
        });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(400)
          .json({ data: err, status: "error", message: "Jimp image error" });
      });
  }
};
module.exports = runpodupload;
