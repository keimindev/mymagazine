import React, {useEffect, useState} from 'react'
import Post from "../components/Post"
import LeftPost from "../components/LeftPost"
import RightPost from "../components/RightPost"

import {useDispatch, useSelector} from 'react-redux'
import { actionCreators as postActions} from '../redux/modules/post'
import CommentList from '../components/CommentList'
import CommentWrite from '../components/CommentWrite'

function PostDetail(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const user_info = useSelector((state) => state.user.user);
    const post_list = useSelector(state => state.post.list);
    const post_idx = post_list.findIndex((p) => p.id === id)
    const post = post_list[post_idx]

    useEffect(() =>{

        if(post){
            return;
        }
        
        dispatch(postActions.getOnePostFB(id))

    },[])

    return (
        <>
         {post && post.direction === "center" ? <Post {...post}/> : null}
         {post && post.direction === "right" ? <RightPost {...post}/> : null}
         {post && post.direction === "left" ? <LeftPost {...post}/> : null}
         <CommentWrite post_id={id}/>
         <CommentList post_id={id} />
      
        </>
    )
}

export default PostDetail
