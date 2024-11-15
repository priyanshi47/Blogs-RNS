// Function to handle search
function handleSearch(event) {
    if (event.key === "Enter") {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const filteredBlogs = data.posts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query)
        );
        renderSearchResults(filteredBlogs);
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    renderBlogList(data.posts);
}



// Render blogs in the content area for blog-detail page
function renderSearchResults(blogs) {
    const searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.style.display = "block";
    const blogDetailContainer = document.getElementById("blogDetail");
    blogDetailContainer.style.display = "none";
    const relatedBlogsContainer = document.getElementById("relatedBlogs");
    relatedBlogsContainer.style.display = "none";

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
        : ` <div class="not-found-container">
        <iframe src="https://lottie.host/embed/40a3bba4-9cc1-4b83-9c62-c3fccaf8a2db/dZToBHszFI.json"></iframe>
        <p class="not-found-message">No blogs found matching your search.</p>
        <p class="try-search-message">Try searching for something else or explore other categories!</p>
       <a href="index.html"><button class="back-button">Back</button></a>
    </div>`;
}

// Display the details of the selected blog
const params = new URLSearchParams(window.location.search);
const blogId = params.get('id');
const blog = data.posts.find(post => post.id == blogId);

const blogDetailContainer = document.getElementById("blogDetail");
const relatedBlogsContainer = document.getElementById("relatedBlogs");

function renderBlogDetails(blog) {
    if (blog) {
        blogDetailContainer.innerHTML = `
        <a href="index.html"><button class="back-button">Back</button></a>
            <h1>${blog.title}</h1>
            <p>by ${blog.author} on ${new Date(blog.date).toLocaleDateString()}</p>
            <img src="${blog.img}" alt="${blog.title}" class="blog-detail-image">
            <p>${blog.content}</p>
            <div><strong>Tags:</strong> ${blog.tags.join(", ")}</div>
        `;

        const relatedBlogs = data.posts.filter(post => post.category === blog.category && post.id != blog.id);
        if (relatedBlogs.length > 0) {
            relatedBlogsContainer.innerHTML = `
                <h2>Related Blogs</h2>
                <div class="related-blogs-container">
                    ${relatedBlogs.map(relatedBlog => `
                        <div class="related-blog">
                            <a href="blog-detail.html?id=${relatedBlog.id}">
                                <img src="${relatedBlog.img}" alt="${relatedBlog.title}">
                                <h3>${relatedBlog.title}</h3>
                                <p>by ${relatedBlog.author} on ${new Date(relatedBlog.date).toLocaleDateString()}</p>
                                <p>${relatedBlog.content.slice(0, 90)}...</p>
                            </a>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            relatedBlogsContainer.innerHTML = "<p>No related blogs available.</p>";

            

        }
    } else {
        blogDetailContainer.innerHTML = "<p>Blog not found.</p>";
    }
}

// Show blog details by default
renderBlogDetails(blog);
