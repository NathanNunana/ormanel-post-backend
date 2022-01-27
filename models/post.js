const { ObjectId } = require("bson");

module.exports = class Post {
  constructor(category, title, message, urllink) {
    this.category = category
    this.title = title;
    this.message = message;
    this.urllink = urllink;
  }
  async save(posts) {
    const post = {
      title: this.title,
      message: this.message,
      urllink: this.urllink,
    };
    await posts.insertOne(post);
    console.log("done inserting!");
  }
  static async fetchAll(posts) {
    const savedPosts = await posts.find().toArray();
    return savedPosts;
  }
  static async deleteById(id, posts) {
    const deletedItem = await posts.deleteOne({ _id: ObjectId(id) });
    return deletedItem;
  }
  async updatePost(id, posts) {
    const updatedPost = {
      title: this.title,
      message: this.message,
      urllink: this.urllink,
    };
    return await posts.updateOne({ _id: ObjectId(id) }, {$set:updatedPost},{upsert: true});
  }
};
