function handleSearch(event) {
    if (event.key === "Enter") {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const filteredBlogs = data.posts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query)
        );

        // Check if on index.html or blog-detail.html
        const searchResultsContainer = document.getElementById("searchResults");
        if (searchResultsContainer) {
            renderSearchResults(filteredBlogs); // blog-detail.html
        } else {
            renderBlogList(filteredBlogs); // index.html
        }
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";

    // Reset view depending on the page
    const searchResultsContainer = document.getElementById("searchResults");
    if (searchResultsContainer) {
        location.reload(); // Reload blog-detail.html to reset state
    } else {
        renderBlogList(data.posts); // Reset blogs on index.html
    }
}

function renderSearchResults(blogs) {
    const searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = blogs.length
        ? blogs.map(blog => `
            <div class="blog-item">
                <a href="blog-detail.html?id=${blog.id}">
                    <img src="${blog.img}" alt="Blog image" class="blog-image">
                    <h2>${blog.title}</h2>
                    <p>${blog.content.slice(0, 90)}...</p>
                </a>
            </div>
        `).join('')
        : "<img src='assets/NotFound.gif'></img>";
}
