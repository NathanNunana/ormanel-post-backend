const express = require("express");
const Post = require("../models/post");
const router = express.Router();

function savePost(req, res) {
  const body = req.body;
  const category = body.category;
  const title = body.title;
  const message = body.message;
  const urllink = body.urllink;
  const post = new Post(category, title, message, urllink);
  post.save(req.posts);
  console.log(`post route: ${post}`);
  res.json({ success: true });
}

router.post("/post", savePost);

async function loadPost(req, res) {
  const allPosts = await Post.fetchAll(req.posts);
  console.log(allPosts);
  res.json(allPosts);
}

router.get("/posts", loadPost);

async function removePost(req, res) {
  const postId = req.params;
  const deletedPost = await Post.deleteById(postId, req.posts);
  console.log(deletedPost);
  res.json({ success: true });
}

router.get("/posts/remove/:id", removePost);

async function updatePost(req, res){
  const postId = req.params;
  const body = req.body;
  const category = body.category;
  const title = body.title;
  const message =  body.message;
  const urllink = body.urllink;
  const update = new Post(category, title, message, urllink) 
  const updatedPost = await update.updatePost(postId, req.posts);
  console.log(updatedPost)
  res.json(updatedPost)
}

router.get("/posts/update/:id", updatePost)

module.exports = router;