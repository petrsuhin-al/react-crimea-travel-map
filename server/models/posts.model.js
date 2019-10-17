import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({ // модель поста
    createdOn: {
      type: Date,
      "default": Date.now()
    },
    description: {
        type: String,
        default: ''
    },
    images: {
        type: String,
        default: []
    },
    imagesId: {
        type: String,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Post = mongoose.model('Post', postsSchema);
export default Post;