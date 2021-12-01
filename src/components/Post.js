import React from 'react';
import { history}from '../redux/configStore'

import { Grid, Image, Text , Button } from '../elements';
import styled from 'styled-components';
import {Edit, Favorite, FavoriteBorder, ChatBubbleOutline, Close } from '@material-ui/icons';


const Post = (props) => {

    const deletePost = () =>{
        console.log("지워주세요");
    }

    return (
        <PostBox>
         <Grid padding="1em">
             <Grid is_flex>
                 <Grid is_flex width="5em;">
                    <Image shape="circle" src={props.user_info.user_profile} />
                    <Text bold size="22px;">{props.user_info.user_name}</Text>
                 </Grid>
                 <Grid is_flex width="12em;">
                 <Text bold>{props.insert_dt}</Text>
                 {props.is_me && <Button width="4em;" _onClick={() => { history.push(`/write/${props.id}`)}}><Edit className="icon"/></Button>}
                 {props.is_del && <Button width="4em;" _onClick={() => {deletePost()}}><Close className="icon"/></Button>}
                 </Grid>
             </Grid>
             <Grid padding="1em">
                 <Text margin="10px;">{props.contents}</Text>
                 <Image shape="rectangle" src={props.image_url}/>
             </Grid>
             <Grid is_flex width="6em;" margin="1em 0;">
                 <Text bold>
                     <ChatBubbleOutline className="icon"/>
                      {props.comment_cnt}
                </Text>
                 <Text bold>
                     {props.likes_cnt === 0 ? <FavoriteBorder className="icon" />: <Favorite className="icon"/>}
                     {props.likes_cnt}
                </Text>
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
export default Post
