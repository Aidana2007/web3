const API_URL = 'http://localhost:3000/api/blogs';

let editMode = false;
let currentBlogId = null;

const blogForm = document.getElementById('blog-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const bodyInput = document.getElementById('body');
const blogsList = document.getElementById('blogs-list');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

document.addEventListener('DOMContentLoaded', loadBlogs);

blogForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const blogData = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
    author: authorInput.value.trim() || 'Anonymous'
  };

  if (editMode) {
    await updateBlog(currentBlogId, blogData);
  } else {
    await createBlog(blogData);
  }
});

cancelBtn.addEventListener('click', resetForm);

async function createBlog(blogData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });

    const data = await response.json();

    if (data.success) {
      alert('Blog created successfully!');
      resetForm();
      loadBlogs();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error creating blog: ' + error.message);
  }
}

async function loadBlogs() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.success) {
      displayBlogs(data.data);
    }
  } catch (error) {
    console.error('Error loading blogs:', error);
    blogsList.innerHTML = '<p class="empty-state">Error loading blogs</p>';
  }
}

function displayBlogs(blogs) {
  if (blogs.length === 0) {
    blogsList.innerHTML = '<p class="empty-state">No blogs yet. Create your first blog!</p>';
    return;
  }

  blogsList.innerHTML = blogs.map(blog => `
    <div class="blog-card">
      <h3>${blog.title}</h3>
      <div class="blog-meta">
        By ${blog.author} • ${new Date(blog.createdAt).toLocaleDateString()}
      </div>
      <div class="blog-body">${blog.body}</div>
      <div class="blog-actions">
        <button class="btn btn-edit" onclick="editBlog('${blog._id}')">Edit</button>
        <button class="btn btn-delete" onclick="deleteBlog('${blog._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

async function editBlog(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    if (data.success) {
      const blog = data.data;
      titleInput.value = blog.title;
      authorInput.value = blog.author;
      bodyInput.value = blog.body;
      
      editMode = true;
      currentBlogId = id;
      formTitle.textContent = 'Edit Blog Post';
      submitBtn.textContent = 'Update Blog';
      cancelBtn.style.display = 'inline-block';
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (error) {
    alert('Error loading blog: ' + error.message);
  }
}

async function updateBlog(id, blogData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });

    const data = await response.json();

    if (data.success) {
      alert('Blog updated successfully!');
      resetForm();
      loadBlogs();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error updating blog: ' + error.message);
  }
}

async function deleteBlog(id) {
  if (!confirm('Are you sure you want to delete this blog?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (data.success) {
      alert('Blog deleted successfully!');
      loadBlogs();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error deleting blog: ' + error.message);
  }
}

function resetForm() {
  blogForm.reset();
  editMode = false;
  currentBlogId = null;
  formTitle.textContent = 'Create New Blog Post';
  submitBtn.textContent = 'Create Blog';
  cancelBtn.style.display = 'none';
}