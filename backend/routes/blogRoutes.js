import { Router } from 'express';
import {
    createBlog,
    getBlogPosts,
    getBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getBlogs, search, authSearch,
} from '../controller/blogController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

// Public route
router.get('/blogs', getBlogs);
router.get('/blogs/search', search);

// Protected routes (require authentication)
router.use(requireAuth);

router.get('/blog', getBlogPosts);
router.post('/blog', createBlog);
router.get('/blog/search', authSearch);
router.get('/blog/:id', getBlogPost);
router.put('/blog/:id', updateBlogPost);
router.delete('/blog/:id', deleteBlogPost);

export default router;
