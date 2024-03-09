// Importing necessary React features and hooks
import { useEffect, useState } from "react";
import { useAuthContext } from "../hook/useAuthContext.js";
import { useBlogContext } from "../hook/useBlogContext.js";
import BlogCard from "./BlogCard.jsx";
import Header from "./Header.jsx";
import { BlogContext } from "../context/blogContext.jsx";

// Functional component for the BlogHome
const BlogHome = () => {
    // Destructuring values from the BlogContext using the useBlogContext hook
    const { blogs, searchResults, dispatch } = useBlogContext(BlogContext);

    // State variables for managing the search term and user information
    const [search, setSearch] = useState("");
    const { user } = useAuthContext();

    // Function to fetch blog data from the API
    const fetchData = async () => {
        try {
            const uri = "http://localhost:5000/api/user/blog";
            const response = await fetch(uri, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            // If the response is successful, parse the data and dispatch it to the context
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: "SET_BLOG", payload: data });
            }
        } catch (e) {
            // Log an error if something goes wrong during data fetching
            console.error({ error: "Something went wrong fetching data" }, e);
        }
    };

    // Function to handle blog search based on the current search term
    const handleSearch = () => {
        // If search is not empty, filter the blogs based on the search term using regex
        const regex = new RegExp(`\\b${search.trim()}`, 'i');
        const filteredBlogs = blogs.filter(blog => regex.test(blog.title));
        dispatch({ type: "SEARCH_BLOG", payload: filteredBlogs });
    };

    // Logging search term, blogs, and search results to the console for debugging
    console.log(search);
    console.log("Blogs:", blogs);
    console.log("Search Results:", searchResults);

    // useEffect hook to fetch data when the user changes
    useEffect(() => {
        if (!user) {
            return;
        }
        fetchData();
    }, [user]);

    // Render the BlogHome component with Header and BlogCard components
    return (
        <div className="w-[80%] min-h-screen  mx-auto p-10 ">
            {/* Header component to display user information, search input, and handle search function */}
            <Header user={user} setSearch={setSearch} handleSearch={handleSearch} search={search} />

            {/* Grid layout for displaying BlogCard components */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                {/* BlogCard component to display individual blog entries, using searchResults if available */}
                <BlogCard blogs={searchResults || blogs} />
            </div>
        </div>
    );
};

// Export the BlogHome component as the default export
export default BlogHome;
