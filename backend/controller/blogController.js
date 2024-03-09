
import Blog from "../model/blogModel.js";
import mongoose from "mongoose";
import BlogModel from "../model/blogModel.js";










export const createBlog = async (req, res) => {

    const { title , content , excerpt  } = req.body;
    const user_id = req.user._id
    const username = req.user.username;

    try{
    const addBlog = await BlogModel.createBlog(title , content , excerpt , user_id , username);
    res.json(addBlog);

    }catch(err){
        res.status(400).send({error:err.message});
    }




}



export const getBlogs = async (req, res) => {

    try{

        const getBlogs = await BlogModel.getBlogs();
        res.json(getBlogs);

    }catch(err){
        res.status(400).json({error:err.message});
    }

};
export const getBlogPosts = async (req, res) => {

    try{
        const user_id = req.user._id
        const getUserBlog = await BlogModel.getUserBlogs(user_id);
        res.json(getUserBlog);

    }catch(err){
        res.status(400).json({error:err.message});
    }

};


export const getBlogPost = async (req, res) => {
    const {id} = req.params


    try{
       if (mongoose.Types.ObjectId.isValid(id)){

        const posts = await BlogModel.getBlog(id)
           if (posts){

            res.status(200).json(posts);
           } else{

               res.status(400).json({error:`Blog post not found`});
           }
       }else{
           res.status(400).json({error:`Invalid Blog Post ID`});

       }

    }catch(err){

        res.status(400).json({error:err.message});

    }


}
export const search = async (req, res) => {

        try {
            const { search, searchBy } = req.query;

            // Your logic to filter blogs based on search criteria
            const filteredBlogs = await BlogModel.searchBlogs(search, searchBy);

            res.json(filteredBlogs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

};

export const authSearch = async (req, res) => {

        try {
            const { search, searchBy } = req.query;

            // Your logic to filter blogs based on search criteria
            const filteredBlogs = await BlogModel.searchBlogs(search, searchBy);

            res.json(filteredBlogs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

};


export const updateBlogPost = async (req, res) => {
    const {id} = req.params;
    const data = req.body


    try{
        if (mongoose.Types.ObjectId.isValid(id)){

            const updatedPost = await BlogModel.updateBlog(id , data)
            if (updatedPost){

                res.status(200).json(updatedPost);
            } else{

                res.status(400).json({error:`Blog post not found`});
            }
        }else{
            res.status(400).json({error:`Invalid Blog Post ID`});

        }

    }catch(err){

        res.status(400).json({error:err.message});

    }


}
// export const deleteBlogPost = async (req, res) => {
//     const {id} = req.params
//
//     try{
//         if (mongoose.Types.ObjectId.isValid(id)){
//
//             const deletedPost = await BlogModel.deleteBlog(id)
//             if (deletedPost){
//
//                 res.status(200).json(deletedPost);
//             } else{
//
//                 res.status(400).json({error:`Blog post not found`});
//             }
//         }else{
//             res.status(400).json({error:`Invalid Blog Post ID`});
//
//         }
//
//     }catch(err){
//
//         res.status(400).json({error:err.message});
//
//     }
//
//
//
// }


export const deleteBlogPost = async (req, res) => {
    const { id } = req.params;

    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const deletedPost = await BlogModel.deleteBlog(id);
            if (deletedPost) {
                res.status(200).json(deletedPost);
            } else {
                res.status(404).json({ error: "Blog post not found" });
            }
        } else {
            res.status(400).json({ error: "Invalid Blog Post ID" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
