const { mongoConect } = require("../../config/dbConecction");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const urlEncodeBodyParser = require("@middy/http-urlencode-body-parser");
const exampleModel = require("../../models/example");

const handlePutExample = async (event) => {
  const { id } = event.pathParameters;
  const { exampleString, exampleNumber, exampleObject, exampleArray } =
    event.body;
  try {
    //conecting to mongo database
    mongoConect(process.env.MONGO_DB_URI);
    const updatedExample = await exampleModel.findByIdAndUpdate(id, {
      exampleString,
      exampleNumber,
      exampleObject,
      exampleArray,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(updatedExample),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

//using middy middleware to parse body and params
//if needed multipart parsing add the corresponding middy parser here
//also dont forget to install the corresponding dependency
module.exports = {
  handlePutExample: middy(handlePutExample)
    .use(jsonBodyParser())
    .use(urlEncodeBodyParser()),
};
