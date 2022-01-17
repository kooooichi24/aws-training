const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET_NAME = "sls-image-list-json-dev-bucket";

module.exports.createImageListJson = async (event) => {
  let response;
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: "uploads",
    };
    response = await s3.listObjectsV2(params).promise();
    console.log("s3.listObjectsV2 response data: ", response);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: "uploadedImageList.json",
      Body: JSON.stringify(response),
    };
    await s3.putObject(params).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
