const express = require("express");
const mongoose = require("mongoose");

// Create the Blog model with the updated schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    thumbnail: {
      type: String, // URL for the thumbnail image
      required: true,
    },
    readTime: {
      type: String, // Time taken to read the blog post
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Blog = mongoose.model("Blog", blogSchema);

// Create an Express router for the blog routes
const router = express.Router();

// Route to fetch all blog posts
router.get("/getBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetching all blog posts
    res.json({ blogs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blog posts: " + err.message });
  }
});

router.get("/getBlog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id); // Find the blog post by the provided ID
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blog); // The MongoDB _id is included by default
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blog post: " + err.message });
  }
});

// Route to create a new blog post (Optional)
router.post("/addBlog", async (req, res) => {
  const { title, content, author, publishDate, thumbnail, readTime } = req.body;

  const newBlog = new Blog({
    title,
    content,
    author,
    publishDate,
    thumbnail,
    readTime,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating blog post: " + err.message });
  }
});

module.exports = router;
