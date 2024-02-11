"use client"

import React, { useState, useEffect } from 'react'
import PostCardList from './PostCardList'

export const ContentCard = () => {
    const [posts, setPosts] = useState([])
    // const [loading, setLoading] = useState(true)
 const fetchPosts = async () => {

            console.log("runned");
            try {
                const response = await fetch('/api/post');
                const data = await response.json();
                setPosts(data)
            } catch (error) {
                console.error('Error fetching posts:', error);
                
            } 
        }
    useEffect(() => {
       
        
        fetchPosts();
    }, [])

    console.log(posts)

    return (
        <div className='flex flex-col gap-5 '>
           
                <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm bg-white p-5 gap-2">
                    <PostCardList key={posts._id} post={posts}></PostCardList>
                </div>
            
        </div>
    )
}
