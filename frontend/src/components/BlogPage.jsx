// Importing necessary components and hooks
import BlogCard from "./BlogCard.jsx";
import Header from "./Header.jsx";
import { BlogContext } from "../context/blogContext.jsx";
import { useBlogContext } from "../hook/useBlogContext.js";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hook/useAuthContext.js";

// Functional component for the BlogPage
const BlogPage = () => {
    // State variables for holding blog data, search term, and user information
    const [blog, setBlog] = useState(null);
    const [search, setSearch] = useState(" ");
    const { user } = useAuthContext();

    // Function to fetch blog data based on the search term
    const fetchData = async () => {
        try {
            // Constructing the URI for fetching data based on the search term
            const uri = search
                ? `http://localhost:5000/api/user/blogs/search?search=${search}&searchBy=title`
                : 'http://localhost:5000/api/user/blogs';

            // Fetching data from the specified URI
            const response = await fetch(uri);

            // Check if the response is successful, then parse and set the blog data
            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            }
        } catch (e) {
            // Log an error if something goes wrong during data fetching
            console.error({ error: "Something went wrong fetching data" }, e);
        }
    };

    // useEffect hook to trigger the fetchData function when the search term changes
    useEffect(() => {
        fetchData();
    }, [search]);

    // Render the BlogPage component with Header and BlogCard components
    return (
        <div className='w-[80%] min-h-screen  mx-auto p-10 '>
            {/* Header component to display user information and search input */}
            <Header user={user} setSearch={setSearch} />

            {/* Grid layout for displaying BlogCard components */}
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-4'>
                {/* BlogCard component to display individual blog entries */}
                <BlogCard blogs={blog} />
            </div>
        </div>
    );
};

// Export the BlogPage component as the default export
export default BlogPage;
