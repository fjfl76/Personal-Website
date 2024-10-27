document.addEventListener('DOMContentLoaded', () => {
    // Load previous posts from local storage
    loadBlogPosts();
});

function loadBlogPosts() {
    const postsList = document.getElementById('posts-list');
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    postsList.innerHTML = ''; // Clear existing list
    posts.forEach((post, index) => {
        const listItem = document.createElement('li');
        
        // Create link for displaying the post
        const link = document.createElement('a');
        link.href = "#";
        link.textContent = post.title;
        link.onclick = () => displayPostContent(post);
        listItem.appendChild(link);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteBlogPost(index);
        listItem.appendChild(deleteButton);

        postsList.appendChild(listItem);
    });
}

function displayPostContent(post) {
    // Show the content section
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.content;
    document.getElementById('blog-posts').style.display = 'none';
    document.getElementById('post-content').style.display = 'block';
}

function hidePostContent() {
    // Hide the content section and go back to the posts list
    document.getElementById('post-content').style.display = 'none';
    document.getElementById('blog-posts').style.display = 'block';
}

function addBlogPost() {
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();

    if (title === '' || content === '') {
        alert('Please enter both a title and some content for your blog post.');
        return;
    }

    const newPost = { title, content };
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.unshift(newPost); // Add new post to the beginning

    // Save updated posts to local storage
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // Clear the input fields
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-content').value = '';

    // Reload the posts list
    loadBlogPosts();
}

function deleteBlogPost(index) {
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.splice(index, 1); // Remove the post at the given index

    // Save the updated posts list to local storage
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // Reload the posts list
    loadBlogPosts();
}
