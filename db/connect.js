const { MongoClient } = require("mongodb")

const connectDB = async (url) => {
    const client = await MongoClient.connect(url);
    return client.db("interviewdb");
}

module.exports = connectDB