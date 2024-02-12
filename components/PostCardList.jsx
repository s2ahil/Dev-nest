"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const PostCardList = ({ post }) => {
    console.log("reaches post card list")
    return (
        <>


            <div className='flex flex-col gap-3 '>
                {post.map((item) => (


                    <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-start gap-3 w-full">
                        <div className='flex gap-1 items-center '>
                            <Image class="rounded-full  "
                                width={37}
                                height={37}
                                src={item.creator?.image} alt="profile picture" />
                            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                <div>{item.creator?.username}</div>
                            </div>

                        </div>

                        <Link href={`/user/${item._id}`} className=''>
                            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue-500">{item?.title}</h5>
                        </Link>


                        <div className='text-gray-300'>
                            {item?.tag.includes(',') ? (
                                item?.tag.split(',').map((tag, index) => (
                                    <span key={index}>{tag.trim()} </span>
                                ))
                            ) : (
                                <span>{item?.tag}</span>
                            )}

                        </div>

                        <div className='flex gap-4 '>
                            <div className=''>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 bg-red-400 rounded-full p-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg> 
                            </div>
                            <div className='flex pt-1'>  <p className='text-white '>
                                {item?.likesCount}</p></div>

                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}

export default PostCardList
