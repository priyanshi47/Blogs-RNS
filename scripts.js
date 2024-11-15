// Handle search functionality
function handleSearch(event) {
    if (event.key === "Enter") {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const filteredBlogs = filterBlogs(query);
        renderBlogList(filteredBlogs);
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    renderBlogList(data.posts);
}

// Filter blogs based on query
function filterBlogs(query) {
    return data.posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );
}

// Category selection logic
let selectedCategories = [];

function addCategory(category) {
    selectedCategories = [category]; // Reset selected categories
    filterBlogsByCategory();
}

function removeCategory() {
    selectedCategories = []; // Clear the selection
    filterBlogsByCategory();
}

function filterBlogsByCategory() {
    const filteredBlogs = selectedCategories.length === 0
        ? data.posts
        : data.posts.filter(post => selectedCategories.includes(post.category));

    renderBlogList(filteredBlogs);
}

// Render blogs to the page
function renderBlogList(blogs) {
    const content = document.getElementById("content");
    content.innerHTML = blogs.length === 0 ? `<img src="assets/NotFound.gif" width="100vw" height="80vh" alt="Not Found">` : '';

    blogs.forEach(blog => {
        const blogElement = createBlogElement(blog);
        content.appendChild(blogElement);
    });
}

// Create blog item element
function createBlogElement(blog) {
    const blogElement = document.createElement("div");
    blogElement.className = "blog-item";
    blogElement.innerHTML = `
        <a href="blog-detail.html?id=${blog.id}">
            <img src="${blog.img}" alt="Blog image" class="blog-image">
            <h2>${blog.title}</h2>
            <p>by ${blog.author} on ${blog.date}</p>
            <p>${blog.content.slice(0, 90)}...</p>
            <a href="blog-detail.html?id=${blog.id}">Read more</a>
        </a>
    `;
    return blogElement;
}

// Render category buttons
function renderCategoryButtons() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = getUniqueCategories();
    categoryFilter.innerHTML = '';

    categories.forEach(category => {
        const categoryButton = createCategoryButton(category);
        categoryFilter.appendChild(categoryButton);
    });
}

// Get unique categories
function getUniqueCategories() {
    return Array.from(new Set(data.posts.map(post => post.category)));
}


// Create category button element
function createCategoryButton(category) {
    const categoryButton = document.createElement("div");
    categoryButton.className = "category-button";
    categoryButton.innerText = category;

    // Highlight selected category
    categoryButton.classList.toggle('selected', selectedCategories.includes(category));

    categoryButton.onclick = () => {
        selectedCategories.includes(category) ? removeCategory() : addCategory(category);
    };

    return categoryButton;
}

// Initialize the app when the page loads
window.onload = () => {
    renderCategoryButtons();
    renderBlogList(data.posts);
};
