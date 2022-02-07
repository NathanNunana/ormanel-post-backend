const { MongoClient } = require("mongodb")

const connectDB = async (url) => {
    return await MongoClient.connect(url)
}

module.exports = connectDB