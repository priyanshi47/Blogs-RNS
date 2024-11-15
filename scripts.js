// Function to handle search
function handleSearch(event) {
    if (event.key === "Enter") {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const filteredBlogs = data.posts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query)
        );
        renderBlogList(filteredBlogs);
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    renderBlogList(data.posts);
}

// Category selection logic
let selectedCategories = [];

const addCategory = (category) => {
    if (!selectedCategories.includes(category)) {
        selectedCategories.push(category);
    }
    filterBlogsByCategory();
};

const removeCategory = (category) => {
    selectedCategories = selectedCategories.filter(c => c !== category);
    filterBlogsByCategory();
};

const filterBlogsByCategory = () => {
    const filteredBlogs = selectedCategories.length === 0
        ? data.posts
        : data.posts.filter(post => selectedCategories.includes(post.category));

    renderBlogList(filteredBlogs);
};

// Render blogs in the content area
function renderBlogList(blogs) {
    const content = document.getElementById("content");
    content.innerHTML = ""; // Clear previous content

    blogs.forEach(blog => {
        const blogElement = document.createElement("div");
        blogElement.className = "blog-item";
        blogElement.innerHTML = `
            <img src="${blog.img}" alt="Blog image" class="blog-image">
            <h2>${blog.title}</h2>
            <p>${blog.content.slice(0, 90)}...</p>
            <a href="blog-detail.html?id=${blog.id}">Read more</a>
        `;
        content.appendChild(blogElement);
    });
}

// Generate category buttons
function renderCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = Array.from(new Set(data.posts.map(post => post.category))); // Get unique categories

    categories.forEach(category => {
        const categoryButton = document.createElement("div");
        categoryButton.className = "category-button";
        categoryButton.innerText = category;
        categoryButton.onclick = () => {
            if (selectedCategories.includes(category)) {
                removeCategory(category);
                categoryButton.classList.remove('selected');
            } else {
                addCategory(category);
                categoryButton.classList.add('selected');
            }
        };
        
        categoryFilter.appendChild(categoryButton);
    });
}

// Initialize the app when the page loads
window.onload = () => {
    renderCategories();
    renderBlogList(data.posts); // Display all posts by default
};
