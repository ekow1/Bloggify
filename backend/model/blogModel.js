
import mongoose from "mongoose";

// Import necessary modules and dependencies...

const { Schema, model } = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    user_id: {
        type: String, // Use the correct type for user_id
        required: true,
    },
    author: {
        type: String, // Use the correct type for user_id
        required: true,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    }
});

BlogSchema.statics.createBlog = async function (title, content, excerpt, user_id ,username) {
    return await this.create({ title, content, excerpt, user_id , author : username});
};

BlogSchema.statics.getBlogs = async function () {
    return await this.find().sort({ dateCreated: -1 });
};

BlogSchema.statics.getUserBlogs = async function (user_id) {
    return await this.find({ user_id }).sort({ dateCreated: -1 });
};

BlogSchema.statics.getBlog = async function (id) {
    return await this.findById(id);
};
BlogSchema.statics.searchBlogs = async function (search, searchBy) {
    let query = {};

    if (search && searchBy === 'title') {
        query = { title: { $regex: new RegExp(search, 'i') } };
    }

    return await this.find(query).sort({ dateCreated: -1 });
};


BlogSchema.statics.updateBlog = async function (id, data) {
    return await this.findOneAndUpdate({ _id: id }, data, { new: true }); // Set { new: true } to return the updated document
};

BlogSchema.statics.deleteBlog = async function (id) {
    return await this.findByIdAndDelete(id);
};

const BlogModel = model('Blog', BlogSchema);

export default BlogModel;
