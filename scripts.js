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
    selectedCategories = [category]; // Reset selectedCategories to only the new category
    filterBlogsByCategory();
    renderCategoryButtons();
};

const removeCategory = () => {
    selectedCategories = []; // Clear the selection
    filterBlogsByCategory();
    renderCategoryButtons();
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
         <a href="blog-detail.html?id=${blog.id}">
         
            <img src="${blog.img}" alt="Blog image" class="blog-image">
            <h2>${blog.title}</h2>
            <p>by ${blog.author} on ${blog.date}</p>
            <p>${blog.content.slice(0, 90)}...</p>
            <a href="blog-detail.html?id=${blog.id}">Read more</a>
         </a>
            `;
        content.appendChild(blogElement);
    });
}

// Generate category buttons
function renderCategoryButtons() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = Array.from(new Set(data.posts.map(post => post.category))); // Get unique categories
    categoryFilter.innerHTML = ''; // Clear existing categories

    categories.forEach(category => {
        const categoryButton = document.createElement("div");
        categoryButton.className = "category-button";
        categoryButton.innerText = category;

        // Highlight selected category
        if (selectedCategories.includes(category)) {
            categoryButton.classList.add('selected');
        } else {
            categoryButton.classList.remove('selected');
        }

        // Add click event for each category
        categoryButton.onclick = () => {
            if (selectedCategories.includes(category)) {
                removeCategory();
            } else {
                addCategory(category);
            }
        };

        categoryFilter.appendChild(categoryButton);
    });
}

// Initialize the app when the page loads
window.onload = () => {
    renderCategoryButtons(); // Render category buttons
    renderBlogList(data.posts); // Display all posts by default
};
