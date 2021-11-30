import React from 'react'
import Post from "../components/Post"
import CommentInput from '../components/CommentInput'
import CommentList from '../components/CommentList'

function PostDetail() {
    return (
        <>
         <Post/>
         <CommentInput/>
         <CommentList/>
        </>
    )
}

export default PostDetail
