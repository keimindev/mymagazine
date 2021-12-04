import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment"

import { Grid } from '../elements';
import CommentItem from '../shared/CommentItem';
import styled from 'styled-components';


const CommentList = (props) => {
    const dispatch = useDispatch();
    const comment_list = useSelector( state => state.comment.list);
    console.log(comment_list)
    const {post_id} = props;
    
    useEffect(() =>{
        if(!comment_list[post_id]){
            dispatch(commentActions.getCommentFB(post_id));
        }
    },[])

    if(!comment_list[post_id] || !post_id){
        return null;
    }
    return (
        <>
            <Grid padding="1em">
                {comment_list[post_id].map( (c)  => {
                    return <CommentItem key ={c.id} {...c} />;
                })}
            </Grid>
        </>
    )
}

CommentList.defaultProps={
    post_id: null
}

export default CommentList
