
module.exports = function (app) {
  const database = app.context.db;
  app.context.models.ads = createAdModel(database);
  app.context.models.auth = createAuthModel(database);
};

function createAuthModel(db) {
  const model = {};
  const COLLECTION = "auth";

  model.findByToken = async function (token) {
    return await db.collection(COLLECTION).findOne({ token });
  };

  return model;
}

function createAdModel(db) {
  const model = {};
  const COLLECTION = "ads";

  model.getByPlacement = async function (placement) {
    return await db.collection(COLLECTION).find({ placement }).toArray();
  };

  return model;
}
