# Blog CRUD API - Assignment 3

A fully functional CRUD (Create, Read, Update, Delete) API for a simple blogging platform using Node.js and MongoDB.

## Project Structure

```
blog-crud-api/
├── server/
│   ├── models/
│   │   └── Blog.js
│   ├── routes/
│   │   └── blogRoutes.js
│   ├── config/
│   │   └── database.js
│   └── server.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── package.json
├── .env
└── README.md
```


## API Endpoints

### 1. Create Blog Post
- **URL:** `POST /api/blogs`
- **Body:**
  ```json
  {
    "title": "My First Blog",
    "body": "This is the content of my blog",
    "author": "John Doe"
  }
  ```

### 2. Get All Blogs
- **URL:** `GET /api/blogs`

### 3. Get Single Blog
- **URL:** `GET /api/blogs/:id`

### 4. Update Blog
- **URL:** `PUT /api/blogs/:id`
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "body": "Updated content",
    "author": "John Doe"
  }
  ```

### 5. Delete Blog
- **URL:** `DELETE /api/blogs/:id`

## Testing with Web Interface

1. Start the server: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Use the web interface to:
   - Create new blog posts
   - View all blogs
   - Edit existing blogs
   - Delete blogs

## Features Implemented

All 5 CRUD operations (POST, GET, PUT, DELETE)  
Data validation (title and body required)  
Default author as "Anonymous"  
Automatic timestamps (createdAt, updatedAt)  
Comprehensive error handling  
Proper HTTP status codes  
Clean code structure  
Responsive web interface
