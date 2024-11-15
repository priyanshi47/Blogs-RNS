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

// Category selection logic (select only one category at a time)
let selectedCategory = null;

function setCategory(category) {
    if (selectedCategory === category) {
        selectedCategory = null; // Deselect if the same category is clicked again
    } else {
        selectedCategory = category; // Select the new category
    }
    filterBlogsByCategory();
}

function filterBlogsByCategory() {
    const filteredBlogs = selectedCategory === null
        ? data.posts
        : data.posts.filter(post => post.category === selectedCategory);

    renderBlogList(filteredBlogs);
}

// Render blogs to the page
function renderBlogList(blogs) {
    const content = document.getElementById("content");
    content.innerHTML = blogs.length === 0 ? `
    <div class="not-found-container">
                <iframe src="https://lottie.host/embed/40a3bba4-9cc1-4b83-9c62-c3fccaf8a2db/dZToBHszFI.json"></iframe>
                <p class="not-found-message">No blogs found matching your search.</p>
                <p class="try-search-message">Try searching for something else or explore other categories!</p>
                <a href="index.html"><button class="back-button">Back</button></a>
            </div>` : '';

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
            <h2>${blog.title.slice(0,30)}...</h2>
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
    categoryButton.classList.toggle('selected', selectedCategory === category);

    categoryButton.onclick = () => {
        setCategory(category); // Set category when clicked
        renderCategoryButtons(); // Re-render category buttons to update the selected state
    };

    return categoryButton;
}

// Initialize the app when the page loads
window.onload = () => {
    renderCategoryButtons();
    renderBlogList(data.posts);
};

