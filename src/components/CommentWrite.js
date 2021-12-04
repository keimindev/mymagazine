import React , {useState} from 'react'
import styled from 'styled-components';
import { actionCreators as commentActions } from '../redux/modules/comment';
import { useDispatch, useSelector} from "react-redux";
import CommentList from './CommentList';


import { Grid, Input, Button } from '../elements';
import Permit from '../shared/Permit';

const CommentWrite = (props) => { 
   const dispatch = useDispatch();
   const [comment_text, setCommentText] = useState();
   const {post_id} = props;
   
   const onChange = (e) => {
       setCommentText(e.target.value);

   }
  
   const write=()=>{
    if (comment_text === "") {
        window.alert("댓글을 입력해주세요!");
        return;
      }
       dispatch(commentActions.addCommentFB(post_id, comment_text))
       setCommentText("")
   }


    return (
        <>
        <Permit>
        <Box>
            <Grid width="35em;">
                <Input label="" placeholder="댓글 내용을 입력해주세요 😀" _onChange={onChange} value={comment_text}/>
            </Grid>
            <Button width="5em;" margin="0xp 5px 0px 5px" _onClick={write}  >작성</Button>
        </Box>
        <CommentList/>
        </Permit>
        </>
    )
}


const Box = styled.div`
width: 980px;
min-width: 400px;
margin: 0 auto;

display: flex;
align-items: center;
justify-content: center;


`;


export default CommentWrite
