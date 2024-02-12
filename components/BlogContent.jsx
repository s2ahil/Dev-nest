"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import '../node_modules/react-quill/dist/quill.snow.css'
import ReactQuill from "react-quill";
import { useParams } from 'next/navigation'
import Image from 'next/image';
const quillModules = {
    toolbar: [

    ],
};

const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
];

const BlogContent = () => {
    const { data: session, status } = useSession();

    const [post, setPost] = useState([])
    const [comment, setComment] = useState([]);
    const [storedComments, setStoredComments] = useState([]);
    const { id } = useParams()



   
    useEffect(() => {
        const fetchPostById = async () => {
            try {
                const response = await fetch(`/api/user/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const postData = await response.json();
                console.log(postData)
                setPost(postData);
                setStoredComments(postData.comments)
            } catch (error) {
                console.error('Error fetching post:', error);
            }


        };

        fetchPostById();
    }, []);

    console.log("post",post)

    const handleCommentSubmit = async () => {

        try {
            const response = await fetch(`/api/user/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: comment,  userId: session?.user.id, })
            });
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            const newCommentData = await response.json();
            setStoredComments([...storedComments, newCommentData]);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }

    console.log("comments",storedComments)
    return (
        <div className='flex flex-col gap-5 p-4'>

            

            <figcaption class="flex ">
                <img class="rounded-full w-9 h-9" src={post.creator?.image} alt="profile picture" />
                <div class="space-y-0.5 font-medium  text-black text-left rtl:text-right ms-3">
                    <div className='text-xl text-black'>{post.creator?.username}</div>

                </div>
            </figcaption>

            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{post.title}</h1>
            {/* content  */}

            <div>
                <div className='font-normal text-xl pointer-events-none '>
                    <ReactQuill
                        modules={quillModules}
                        formats={quillFormats}
                        value={post.post}
                        className="w-full   h-[70%]  bg-white ">

                    </ReactQuill>
                </div>

            </div>


            <br></br>
            <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold'>Comments Section</p>

                <textarea placeholder="TYPE YOUR COMMENTS" className='w-full p-3 border-2' value={comment}
                    onChange={(e) => setComment(e.target.value)}>

                </textarea>
                <div>
                    <button className='bg-blue-500 text-white w-[10rem] rounded-xl p-2 hover:bg-blue-800' onClick={handleCommentSubmit}>Submit Comment</button>
                </div>
                <div>
                <div className='flex flex-col gap-2 rounded-xl'>
                    {storedComments.map((comment) => (
                        <div className="bg-gray-100 p-3 flex flex-col gap-4" key={comment._id}>

                        <div className='flex gap-4 items-center'>
                        <Image class="rounded-full  "
                                width={37}
                                height={37}
                                src={comment.user?.image} alt="profile picture" />
                        <div>{comment.user?.username}</div>
                        </div>
                       


                        <div className='text-black ml-2 text-lg'>- {comment.text}</div>
                        
                        </div>
                    ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BlogContent
