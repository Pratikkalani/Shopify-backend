const { request } = require("printful-request");

const createproduct = async (req, res) => {
  const data = {
    sync_product: {
      name: "T-shirt",
      external_id: "4235234213",
      is_ignored: true,
      thumbnail:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=2000",
    },
    sync_variants: [
      {
        external_id: "4235234213",
        variant_id: 24,
        retail_price: "29.99",
        sku: "SKU1234",
        is_ignored: true,
        files: [
          {
            type: "default",
            url: "https://img.freepik.com/free-photo/man-wearing-t-shirt-gesturing_23-2149393645.jpg",
            options: [],
            filename: "avatar.png",
            visible: true,
          },
        ],
        // options: [
        //   {
        //     id: "DTG-printing",
        //     value: "flat",
        //   },
        // ],
      },
    ],
  };
  request("orders?store_id=10571185", {
    token: process.env.PRINTFUL_PRIVATE_TOKEN,
    params: data,
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

module.exports = createproduct;
