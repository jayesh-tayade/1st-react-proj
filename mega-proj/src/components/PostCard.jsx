import React from "react"
import appwriteService from "../appwrite/config"

import { Link } from "react-router-dom"

function PostCard({post}) {

    if (!post) return null;
  return (
    <Link to={`/post/${post.$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                {post.featuredImage && (
                <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl" />
                )}
            </div>
            <h2 className='text-xl font-bold'>
                {post.title || "Untitled Post"}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard
