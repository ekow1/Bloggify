// Importing necessary React features, icons, and components
import { RiDeleteBin4Fill, RiFileEditFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import BlogDetails from "./BlogDetails.jsx";
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from 'react';
import { useBlogContext } from "../hook/useBlogContext.js";
import UpdateBlog from "./UpdateBlog.jsx";
import { useAuthContext } from "../hook/useAuthContext.js";

// Functional component for displaying individual blog cards
const BlogCard = ({ blogs }) => {
    // State variables for formatted date, loading states, and accessing context dispatch
    const [formattedDate, setFormattedDate] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});
    const { dispatch } = useBlogContext();
    const { user } = useAuthContext();

    // useEffect to fetch and format the date when blogs change
    useEffect(() => {
        const fetchAndFormatData = async () => {
            if (blogs && blogs.length > 0) {
                const formatted = blogs.map(blog => (
                    formatDistanceToNow(new Date(blog.dateCreated), { addSuffix: true })
                ));
                setFormattedDate(formatted);
            }
        }

        fetchAndFormatData();
    }, [blogs]);

    // Function to handle blog deletion
    const handleDelete = async (blogId) => {
        if (!user) {
            return;
        }
        try {
            // Set loading state for the specific blogId
            setLoadingStates(prevLoadingStates => ({ ...prevLoadingStates, [blogId]: true }));

            const response = await fetch(`http://localhost:5000/api/user/blog/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });

            if (response.ok) {
                // Update the state only for the specific blogId
                dispatch({ type: "DELETE_BLOG", payload: blogId });
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        } finally {
            // Reset loading state for the specific blogId
            setLoadingStates(prevLoadingStates => ({ ...prevLoadingStates, [blogId]: false }));
        }
    };

    // Function to get a shortened excerpt of the blog content
    const getShortenedExcerpt = (excerpt) => {
        const words = excerpt.split(' ').slice(0, 70).join(' ');
        return `${words}...`;
    };

    // Render individual blog cards
    return (
        <>
            {blogs && blogs.map((blog, index) => (
                <div
                    className="relative max-w-sm p-6 h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    key={blog._id}
                >
                    {/* Blog card header with author and edit/delete options */}
                    <div className='w-full flex justify-between items-center gap-3 text-sm font-medium text-gray-900 dark:text-gray-400 mb-3 cursor-pointer mb-5'>
                        <p className='flex items-center justify-center gap-2 bg-white px-3 py-1 rounded-lg text-gray-800'> <RxAvatar size={20} /> {blog.author}  </p>
                        <div className="flex items-center gap-2">
                            {user && (
                                <>
                                    {/* UpdateBlog component for editing the blog */}
                                    <UpdateBlog blog={blog} key={blog._id}/>
                                    {/* Delete icon to trigger blog deletion */}
                                    <RiDeleteBin4Fill size={20} onClick={() => handleDelete(blog._id)} />
                                </>
                            )}

                            {/* Display 'Deleting...' while deletion is in progress */}
                            {loadingStates[blog._id] && <p>Deleting...</p>}
                        </div>
                    </div>
                    {/* Blog title */}
                    <a href="#">
                        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                    </a>
                    {/* Blog excerpt */}
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                        {getShortenedExcerpt(blog.excerpt)}
                    </p>
                    {/* Blog footer with date and BlogDetails component */}
                    <div className='absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm font-medium text-gray-900 dark:text-gray-400'>
                        <p>{formattedDate[index]}</p>
                        {/* BlogDetails component for displaying extended content in a modal */}
                        <BlogDetails content={blog.content} title={blog.title} time={formattedDate[index]} author={blog.author} />
                    </div>
                </div>
            ))}
        </>
    )
}

// Export the BlogCard component as the default export
export default BlogCard;
