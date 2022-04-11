module.exports = (db) => {
  return (req, res, next) => {
    req.posts = db.collection("posts");
    req.users = db.collection("users");
    next();
  };
};
