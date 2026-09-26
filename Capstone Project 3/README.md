# OnlyBlogs - Personal Blogging Platform

A beautiful, full-stack blogging platform built with Node.js, Express, and EJS.

## Features

✨ **Create, Read, Update, Delete** posts with a beautiful UI  
🔍 **Search & Filter** posts by category and keywords  
📊 **Statistics Dashboard** showing total posts, recent activity, and categories  
🎨 **Modern Design** with gradient colors and smooth animations  
📱 **Fully Responsive** works great on all devices  
⚡ **Server-Side Rendering** using EJS templates  
🚫 **Zero Custom JavaScript** - 100% server-rendered with no client-side JS

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Styling**: Bootstrap 5, Custom CSS
- **Icons**: Font Awesome
- **Data Storage**: In-memory (can be easily extended to use a database)
- **Architecture**: Pure server-side rendering with zero custom client-side JavaScript

## Installation

1. Make sure you have Node.js installed on your system
2. Navigate to the project directory:
   ```
   cd "Capstone Project 3"
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

Start the server:
```
node index.js
```

The application will be running at: **http://localhost:3000**

## How It Works

### Backend (index.js)
- All application logic is handled on the server
- Posts are stored in memory (array)
- Express routes handle CRUD operations
- Server-side rendering with EJS templates
- Utility functions for formatting dates, colors, etc.

### Frontend (EJS Templates)
- **index.ejs**: Main homepage with posts list
- **view.ejs**: Individual post view page
- **edit.ejs**: Post editing page with pre-populated form
- Posts are rendered directly from the server
- Bootstrap modals for creating new posts
- Forms use standard HTML POST submissions
- Filters auto-submit using `onchange` attribute

### Zero Custom JavaScript
- No custom client-side JavaScript files
- Only Bootstrap's built-in JS for modal functionality
- All interactivity handled through server-side routing
- Pure HTML forms with POST/GET requests

## Routes

- `GET /` - Home page with all posts (supports query params: search, category, sort)
- `POST /posts` - Create a new post
- `GET /posts/:id` - View individual post page
- `GET /posts/:id/edit` - Edit post page (renders form with pre-populated data)
- `POST /posts/:id/edit` - Update an existing post
- `POST /posts/:id/delete` - Delete a post

## Data Structure

Each post contains:
```javascript
{
  id: "unique-id",
  title: "Post Title",
  category: "technology",
  content: "Post content...",
  author: "Author Name",
  createdAt: "2025-01-15T10:30:00.000Z",
  updatedAt: "2025-01-15T10:30:00.000Z"
}
```

## Categories

- Technology
- Lifestyle
- Travel
- Food
- Other

## Architecture Benefits

✅ **SEO Friendly** - All content rendered server-side  
✅ **No JavaScript Required** - Works even with JS disabled  
✅ **Fast Initial Load** - No client-side rendering delay  
✅ **Simple Debugging** - All logic in one place (server)  
✅ **Progressive Enhancement** - Core functionality works everywhere  
✅ **Lightweight** - No heavy client-side frameworks  

## Future Enhancements

- Add database integration (MongoDB, PostgreSQL, etc.)
- User authentication and authorization
- Image uploads for posts
- Comments system
- Tags and advanced filtering
- RSS feed
- Social media sharing
- Rich text editor for post content

## Author

**Vibhav Bilgoji**

- Instagram: [@vibhav_the_great](https://www.instagram.com/vibhav_the_great/)
- Twitter: [@BilgojiVibhav](https://x.com/BilgojiVibhav)

## License

© 2025 Vibhav Bilgoji. All rights reserved.

---

Made with ❤️ using Node.js, Express, and EJS