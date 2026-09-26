import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// In-memory data storage
let posts = [
  {
    id: "sample1",
    title: "Welcome to OnlyBlogs!",
    category: "lifestyle",
    content:
      "Welcome to your personal blogging platform! This is a sample post to get you started. Feel free to edit or delete this post and create your own amazing content. Share your thoughts, experiences, and stories with the world!",
    author: "Vibhav Bilgoji",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample2",
    title: "The Future of Web Development",
    category: "technology",
    content:
      "Web development is constantly evolving with new frameworks, tools, and best practices. In this post, we explore the exciting trends shaping the future of web development, from AI integration to progressive web apps and beyond.",
    author: "Tech Enthusiast",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "sample3",
    title: "Amazing Travel Destinations for 2025",
    category: "travel",
    content:
      "Discover the most breathtaking travel destinations for 2025! From hidden gems to popular tourist spots, this guide will help you plan your next adventure. Pack your bags and get ready for unforgettable experiences!",
    author: "Wanderlust Writer",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); //extended = true to support nested objects
app.use(bodyParser.json()); // For parsing application/json
app.use(express.static("public"));

// Set view engine
app.set("view engine", "ejs");

// Utility Functions
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatDate(dateString);
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

function getCategoryColor(category) {
  const colors = {
    technology: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    lifestyle: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    travel: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    food: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    other: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  };
  return colors[category] || colors.other;
}

function calculateStats() {
  const totalPosts = posts.length;

  // Calculate posts from this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentPosts = posts.filter(
    (post) => new Date(post.createdAt) > oneWeekAgo,
  ).length;

  // Count unique categories
  const categories = new Set(posts.map((post) => post.category));
  const totalCategories = categories.size || 5;

  return { totalPosts, recentPosts, totalCategories };
}

function applyFilters(searchTerm = "", category = "all", sortBy = "newest") {
  let filteredPosts = [...posts];

  // Filter by category
  if (category !== "all") {
    filteredPosts = filteredPosts.filter((post) => post.category === category);
  }

  // Filter by search term
  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerSearch) ||
        post.content.toLowerCase().includes(lowerSearch) ||
        post.author.toLowerCase().includes(lowerSearch),
    );
  }

  // Sort posts
  switch (sortBy) {
    case "newest":
      filteredPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      break;
    case "oldest":
      filteredPosts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
      break;
    case "title":
      filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return filteredPosts;
}

// Routes

// Home page - Display all posts
app.get("/", (req, res) => {
  const { search = "", category = "all", sort = "newest" } = req.query;

  const filteredPosts = applyFilters(search, category, sort);
  const stats = calculateStats();

  res.render("index.ejs", {
    posts: filteredPosts,
    stats: stats,
    filters: { search, category, sort },
    formatDate: formatDate,
    formatTime: formatTime,
    truncateText: truncateText,
    getCategoryColor: getCategoryColor,
  });
});

// Create new post
app.post("/posts", (req, res) => {
  const { title, category, content, author } = req.body;

  // Validation
  if (!title || !category || !content) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }

  const newPost = {
    id: generateId(),
    title: title.trim(),
    category: category,
    content: content.trim(),
    author: author.trim() || "Anonymous",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  posts.unshift(newPost);
  res.redirect("/");
});

// Edit page - render form with pre-populated data (must come before /posts/:id)
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  const stats = calculateStats();

  res.render("edit.ejs", {
    post: post,
    stats: stats,
  });
});

// Update post
app.post("/posts/:id/edit", (req, res) => {
  const { title, category, content, author } = req.body;
  const postIndex = posts.findIndex((p) => p.id === req.params.id);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  // Validation
  if (!title || !category || !content) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title: title.trim(),
    category: category,
    content: content.trim(),
    author: author.trim() || "Anonymous",
    updatedAt: new Date().toISOString(),
  };

  res.redirect("/");
});

// Delete post
app.post("/posts/:id/delete", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === req.params.id);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  posts.splice(postIndex, 1);
  res.redirect("/");
});

// View single post page (must come after /posts/:id/edit)
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  const stats = calculateStats();

  res.render("view.ejs", {
    post: post,
    stats: stats,
    formatDate: formatDate,
    getCategoryColor: getCategoryColor,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
