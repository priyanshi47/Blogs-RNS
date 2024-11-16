// Universal Search Functionality
function handleSearch(event) {
    if (event.key === "Enter") {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const filteredBlogs = filterBlogs(query);
        if (isBlogDetailPage()) {
            renderSearchResults(filteredBlogs);
        } else {
            renderBlogList(filteredBlogs);
        }
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    if (isBlogDetailPage()) {
        renderBlogList(data.posts);
    } else {
        renderBlogList(data.posts);
    }
}

// Filter blogs based on a query
function filterBlogs(query) {
    return data.posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );
}

// Category Filtering Logic
let selectedCategory = null;

function setCategory(category) {
    selectedCategory = selectedCategory === category ? null : category;
    const filteredBlogs = selectedCategory
        ? data.posts.filter(post => post.category === selectedCategory)
        : data.posts;
    renderBlogList(filteredBlogs);
    renderCategoryButtons();
}

// Utility: Check if on Blog Detail Page
function isBlogDetailPage() {
    return document.getElementById("blogDetail") !== null;
}

// Render Category Buttons
function renderCategoryButtons() {
    const categoryFilter = document.getElementById("categoryFilter");
    if (!categoryFilter) return;

    const categories = [...new Set(data.posts.map(post => post.category))];
    categoryFilter.innerHTML = categories.map(category => `
        <div class="category-button ${selectedCategory === category ? 'selected' : ''}" 
             onclick="setCategory('${category}')">
            ${category}
        </div>
    `).join('');
}

// Render Blog List
function renderBlogList(blogs) {
    const content = document.getElementById("content");
    if (!content) return;

    content.innerHTML = blogs.length === 0 ? `
        <div class="not-found-container">
            <iframe src="https://lottie.host/embed/40a3bba4-9cc1-4b83-9c62-c3fccaf8a2db/dZToBHszFI.json"></iframe>
            <p class="not-found-message">No blogs found matching your search.</p>
            <a href="index.html"><button class="back-button">Back</button></a>
        </div>
    ` : blogs.map(blog => createBlogHTML(blog)).join('');
}

// Render Blog Details (For Blog Detail Page)
function renderBlogDetails(blog) {
    const blogDetailContainer = document.getElementById("blogDetail");
    const relatedBlogsContainer = document.getElementById("relatedBlogs");

    if (!blogDetailContainer) return;

    if (blog) {
        blogDetailContainer.innerHTML = `
            <h1>${blog.title}</h1>
            <p>by ${blog.author} on ${new Date(blog.date).toLocaleDateString()}</p>
            <img src="${blog.img}" alt="${blog.title}" class="blog-detail-image">
            <p>${blog.content}</p>
        `;

        const relatedBlogs = data.posts.filter(post => post.category === blog.category && post.id !== blog.id);
        relatedBlogsContainer.innerHTML = relatedBlogs.length ? `
            <div> ${blog.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ")}</div>
            <h2>Related Blogs</h2>
            <div class="related-blog">
          
            ${relatedBlogs.map(blog => createBlogHTML(blog)).join('')}
              </div>
        ` : `<div> ${blog.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ")}</div>`;
    } else {
        blogDetailContainer.innerHTML = "<p>Blog not found.</p>";
    }
}

// Render Search Results for Blog Detail Page
function renderSearchResults(blogs) {
    const searchResultsContainer = document.getElementById("searchResults");
    const blogDetailContainer = document.getElementById("blogDetail");
    const relatedBlogsContainer = document.getElementById("relatedBlogs");

    if (!searchResultsContainer) return;

    searchResultsContainer.style.display = "flex";
    blogDetailContainer.style.display = "none";
    relatedBlogsContainer.style.display = "none";

    searchResultsContainer.innerHTML = blogs.length === 0 ? `
    <div class="not-found-container">
        <iframe src="https://lottie.host/embed/40a3bba4-9cc1-4b83-9c62-c3fccaf8a2db/dZToBHszFI.json"></iframe>
        <p class="not-found-message">No blogs found matching your search.</p>
        <a href="index.html"><button class="back-button">Back</button></a>
    </div>
` : blogs.map(blog => createBlogHTML(blog)).join('');
}

// Generate Blog HTML Element
function createBlogHTML(blog) {
    return `
        <div class="blog-item">
            <a href="blog-detail.html?id=${blog.id}">
                <img src="${blog.img}" alt="${blog.title}" class="blog-image">
                <h2>${blog.title.slice(0,30)}...</h2>
                <p>by ${blog.author} on ${blog.date}</p>
                <p>${blog.content.slice(0, 100)}...</p>
            </a>
        </div>
    `;
}

// Initialize Application
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');
    const blog = blogId ? data.posts.find(post => post.id === blogId) : null;

    if (isBlogDetailPage() && blog) {
        renderBlogDetails(blog);
    } else {
        renderCategoryButtons();
        renderBlogList(data.posts);
    }
};
