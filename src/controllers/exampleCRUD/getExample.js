const { mongoConect } = require("../../config/dbConecction");
const exampleModel = require("../../models/example");

const handleGetExample = async (event) => {
  try {
    //conecting to mongo database
    mongoConect(process.env.MONGO_DB_URI);
    const allExamples = await exampleModel.find();
    return {
      statusCode: 200,
      body: JSON.stringify(allExamples),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = {handleGetExample};
