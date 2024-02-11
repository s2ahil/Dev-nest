import { connectToDB } from "@/utils/database";
import Post from '@/models/post'


export async function POST (request) {


    const { userId, post, tag,title } = await request.json();


    try {
        await connectToDB();

        const newPost= new Post({
            creator:userId,tag,post,title
        })

        await newPost.save();


        return new Response(JSON.stringify(newPost),{
            status : 201,
        })
        
    } catch (error) {

        return new Response('Failed to create post',{
            status : 500,
        })
    }

}


// export default Post;