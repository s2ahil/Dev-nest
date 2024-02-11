import { Schema, model, models } from 'mongoose';


const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, "title is required."]
    },
    post: {
        type: String,
        required: [true, "Post is required."]
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.']
    }
    ,
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    
    likesCount: {
        type: String,
        default: '0'
    },


})


const Post = models.Post || model('Post', PostSchema);

export default Post;