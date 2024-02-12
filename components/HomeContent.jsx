"use client"

import React, { useState, useEffect } from 'react';
import PostCardList from './PostCardList';

export const ContentCard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/post');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className='flex flex-col gap-5 '>
            {loading ? (
                <div className="text-center h-full w-full text-xl font-black">Loading...</div>
            ) : (
                <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm bg-white p-5 gap-2">
                    <PostCardList post={posts}></PostCardList>
                </div>
            )}
        </div>
    );
}
