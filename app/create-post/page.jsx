"use client"

import dynamic from 'next/dynamic';
import React from 'react'
import 'react-quill/dist/quill.snow.css'; 

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const CreatePost = () => {


    const { data: session } = useSession();
    const router = useRouter();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('')
    const [submitting, setSubmitting] = useState(false)


    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
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

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    const createPrompt = async (e) => {
        console.log(content,tags,title,session?.user.id);
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/post/new', {
                method: "POST",
                body: JSON.stringify({
                    post: content,
                    userId: session?.user.id,
                    tag: tags,
                    title: title
                })
            })

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='grid items-center bg-[#F5F5F5] h-full '>
            <form
                onSubmit={createPrompt}
                className=''
            >

                <div className='flex flex-col bg-white m-4 rounded-xl p-5 gap-5 '>

                    <div>Create Post</div>

                    <textarea placeholder='Your Blog Title' className='p-3 border-2 text-xl  font-medium w-[90vw]' value={title} onChange={(e) => setTitle(e.target.value)}  ></textarea>

                    <div className="w-[90vw] ">

                        <ReactQuill

                            placeholder="Tell your story ..."
                            onChange={handleEditorChange}
                            modules={quillModules}
                            formats={quillFormats}
                            value={content}
                            className="w-full   h-[70%]  bg-white ">

                        </ReactQuill>
                    </div>

                    <textarea placeholder='Add your tags here like #webdevelopment,#react...' className='p-3 border-2 w-[90vw]' value={tags} onChange={(e) => setTags(e.target.value)}  ></textarea>

                    <button type='submit' className='bg-blue-500 text-white w-[10rem] rounded-xl p-4 hover:bg-blue-800' >Publish</button>

                </div>
            </form>
        </div>
    )
}

export default CreatePost