const Post = require("../models/post");

function savePost(req, res) {
  const {category, title, message, urllink} = req.body;
  const post = new Post(category, title, message, urllink);
  post.save(req.posts);
  console.log(`post route: ${post}`);
  res.json({ success: true });
}

async function loadPost(req, res) {
  const allPosts = await Post.fetchAll(req.posts);
  console.log(allPosts);
  res.json(allPosts);
}

async function removePost(req, res) {
  const postId = req.params;
  const deletedPost = await Post.deleteById(postId, req.posts);
  console.log(deletedPost);
  res.json({ success: true });
}

async function updatePost(req, res) {
  const postId = req.params;
  const {category, title, message, urllink} = req.body;
  const update = new Post(category, title, message, urllink);
  const updatedPost = await update.updatePost(postId, req.posts);
  console.log(updatedPost);
  res.json(updatedPost);
}

module.exports = {
  savePost,
  loadPost,
  removePost,
  updatePost,
};
