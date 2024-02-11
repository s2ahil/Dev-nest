import { connectToDB } from "@/utils/database";
import Post from '@/models/post';

export const GET = async (req, context) => {

    try {
        const { id } = context.params
        await connectToDB();
        console.log("params id", id)
        // Assuming the post ID is passed in the request parameters

        const post = await Post.findById(id).populate('creator');;

        if (!post) {
            return new Response("Post not found", {
                status: 404
            });
        }

        console.log(post);
        return new Response(JSON.stringify(post), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        return new Response("Failed to fetch the post", {
            status: 500
        });
    }
};


export const POST = async (req, context) => {


    try {
        const { id } = context.params;
        const { text } = await req.json();
        console.log("post reached", id)
        await connectToDB();


        // Find the post by its ID
        const post = await Post.findById(id);

        if (!post) {
            return new Response("Post not found", {
                status: 404
            });
        }

        // Add the comment to the post
        post.comments.push({ text });
        // Save the updated post
        await post.save();

        // Return the newly created comment
        return new Response(JSON.stringify(post.comments[post.comments.length - 1]), {
            status: 201 // Created status code
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        return new Response("Failed to add comment", {
            status: 500
        });
    }
};


