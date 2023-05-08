const { mongoConect } = require("../../config/dbConecction");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const exampleModel = require("../../models/example");

const handlePostExample = async (event) => {
  const { exampleString, exampleNumber, exampleObject, exampleArray } =
    event.body;
  try {
    //conecting to mongo database
    mongoConect(process.env.MONGO_DB_URI);
    await exampleModel.create({
      exampleString,
      exampleNumber,
      exampleObject,
      exampleArray,
    });
    return {
      statusCode: 201,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

//using middy middleware to parse body
//if needed urlencode or multipart parsing add the corresponding middy parsers here
//also dont forget to install the corresponding dependency
module.exports = {
  handlePostExample: middy(handlePostExample).use(jsonBodyParser()),
};
