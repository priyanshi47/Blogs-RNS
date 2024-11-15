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

window.onload = () => {
    renderBlogList(data.posts);
};
