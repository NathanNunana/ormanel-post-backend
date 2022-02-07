const express = require("express");
const router = express.Router();

const {
  savePost,
  loadPost,
  removePost,
  updatePost,
} = require("../controllers/posts");

router.post("/post", savePost);

router.get("/allposts", loadPost);

router.delete("/posts/remove/:id", removePost);

router.patch("/posts/update/:id", updatePost);

module.exports = router;
