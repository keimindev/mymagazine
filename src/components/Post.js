import React from 'react';
import { Grid, Image, Text  } from '../elements';
import styled from 'styled-components';
import {Edit, Favorite, FavoriteBorder, ChatBubbleOutline } from '@material-ui/icons';


const Post = (props) => {
    return (
        <PostBox>
         <Grid padding="1em">
             <Grid is_flex>
                 <Grid is_flex width="5em;">
                    <Image shape="circle" src={props.src} />
                    <Text bold size="22px;">{props.user_info.user_name}</Text>
                 </Grid>
                 <Grid is_flex width="10em;">
                 <Text bold>{props.insert_dt}</Text>
                 <Edit/>
                 </Grid>
             </Grid>
             <Grid padding="1em">
                 <Text margin="10px;">{props.contents}</Text>
                 <Image shape="rectangle" src={props.src}/>
             </Grid>
             <Grid is_flex width="7em;">
                 <Text bold>
                     <ChatBubbleOutline className="icon"/>
                      {props.comment_cnt}
                </Text>
                 <Text bold>
                     {props.likes === 0 ? <FavoriteBorder className="icon" />: <Favorite className="icon"/>}
                     {props.likes}
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
    likes: 20,

};


const PostBox = styled.div`
max-width: 980px;
min-width: 400px;
margin: 0em auto;
padding-bottom: 1.5em;
background-color: #fff;
border-bottom: 1px solid pink;

.icon{
    margin: 0 5px;
}
`;
export default Post
