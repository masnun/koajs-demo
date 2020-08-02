const MongoClient = require("mongodb").MongoClient;

module.exports = async function createMongoDBConnection() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    appname: "KoaJSDemo",
  };
  return await (await MongoClient.connect(process.env.MONGO_URL, opts)).db();
};
