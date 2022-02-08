const { MongoClient } = require("mongodb");

const connectDB = async (url) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client.db("ormsocial");
};

module.exports = connectDB;
