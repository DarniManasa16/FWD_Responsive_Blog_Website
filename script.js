// Initialize posts (check localStorage)
let posts = JSON.parse(localStorage.getItem('posts')) || [
    {title:"My First Blog", image:"https://via.placeholder.com/400x200", content:"Welcome to my professional blog!"},
    {title:"Learning JS", image:"https://via.placeholder.com/400x200", content:"JavaScript is powerful and fun!"}
];

const postsContainer = document.getElementById('posts-container');
const postForm = document.getElementById('post-form');
const postIndexInput = document.getElementById('post-index');
const cancelEditBtn = document.getElementById('cancel-edit');

// Render posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        postsContainer.appendChild(postCard);
    });
}

// Add/Edit post
postForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const image = document.getElementById('image').value;
    const content = document.getElementById('content').value;
    const index = postIndexInput.value;

    if(index === '') {
        // Add new post
        posts.push({title, image, content});
    } else {
        // Update existing post
        posts[index] = {title, image, content};
        cancelEditBtn.style.display = 'none';
        postIndexInput.value = '';
        postForm.querySelector('button[type="submit"]').textContent = 'Add Post';
    }

    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
    postForm.reset();
});

// Delete post
function deletePost(index) {
    if(confirm("Are you sure you want to delete this post?")){
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    }
}

// Edit post
function editPost(index) {
    const post = posts[index];
    document.getElementById('title').value = post.title;
    document.getElementById('image').value = post.image;
    document.getElementById('content').value = post.content;
    postIndexInput.value = index;
    cancelEditBtn.style.display = 'inline-block';
    postForm.querySelector('button[type="submit"]').textContent = 'Update Post';
}

// Cancel edit
cancelEditBtn.addEventListener('click', () => {
    postForm.reset();
    postIndexInput.value = '';
    cancelEditBtn.style.display = 'none';
    postForm.querySelector('button[type="submit"]').textContent = 'Add Post';
});

// Dark/Light mode toggle
const toggleThemeBtn = document.getElementById('toggle-theme');
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Initial render
renderPosts();



