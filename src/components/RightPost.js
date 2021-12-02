import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { history}from '../redux/configStore'
import {actionCreators as postActions} from '../redux/modules/post'

import { Grid, Image, Text , Button } from '../elements';
import styled from 'styled-components';
import {Edit, ChatBubbleOutline, Close } from '@material-ui/icons';


const Post = (props) => {
    const dispatch = useDispatch();

    const [count, setCount] = useState(props.likes_cnt)
    const [likes, setLikes] = useState(true);
    const id = props.id;
    

    const delpost = () =>{
        const ok = window.confirm("게시물을 지우시겠습니까?");
        if(ok) dispatch(postActions.delPostFB(props.id,props.image_url))
    }


    const addLike = () => {
        if(likes){
            setCount( count + 1)
            setLikes(false)
        }else{
            setCount( count - 1)
            setLikes(true)
        }

        dispatch(postActions.likePostFB(id,count))
     
    }
    return (
        <PostBox>
         <Grid padding="1em">
                 <Grid is_flex>
                 <Grid is_flex width="32em;">
                    <Image shape="circle" src={props.user_info.user_profile} />
                    <Text bold size="22px;">{props.user_info.user_name}</Text>
                 </Grid>
                 <Grid is_flex width="9em;">
                 <Text size="0.7em;" bold>{props.insert_dt}</Text>
                    {props.is_me && 
                   <Button width="3em;" bg="#fff;" _onClick={() => { history.push(`/write/${props.id}`)}}>
                       <Edit className="icon"/>
                    </Button>}
                 {props.is_me && <Button width="3em;" bg="#fff;"
                 _onClick={() => delpost()}><Close className="icon"/></Button>}
                 </Grid>
             </Grid>
             <Grid _onClick={() => history.push(`/post/${props.id}`)}>
             <Box>
                 <Text  margin="2em 0.8em;" >{props.contents}</Text>
                 <Grid width="700px;" margin="2em 0.8em;">
                 <Image shape="rectangle" src={props.image_url}/>
                 </Grid>
            </Box>
             </Grid>
             <Grid is_flex width="6em;" margin="1em 0;">
                 <Text bold>
                     <ChatBubbleOutline className="icon"/>
                      {props.comment_cnt}
                </Text>
                 <Grid is_flex _onClick={() => addLike()} width="2.5em;">
                 {likes ? <Button bg="#fff;" width="40px;">🤍</Button> : <Button bg="#fff;" width="40px;">💜</Button>}
                     <Text>{count}</Text>
                 </Grid>
             </Grid>
         </Grid>
        </PostBox>
    )
}

Post.defaultProps = {
    user_info: {
        user_name : 'min',
        user_profile: 'https://jjalbot.com/media/2018/12/kPq_-2zCE/zzal.jpg',

    },
    image_url:'https://t1.daumcdn.net/section/oc/0f579edecb2c47dc973b850811d00356',
    contents: "D'oh! 오류를 발견한 내 모습",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00",
    likes_cnt: 20,
    is_me: false,
    is_del: false,

};


const PostBox = styled.div`
    max-width: 760px;
    min-width: 400px;
    margin: 0em auto;
    background-color: #fff;
    border-bottom: 5px solid pink;

    .icon{
        margin: 0 5px;
        font-size: 20px;
        color: #EC7DB6;
    }
    `;
const Box = styled.div`
display: flex;
justify-content: space-between;
padding:"1em";
`;
export default Post
