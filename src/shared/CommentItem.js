import React from 'react'
import { Grid, Image, Text } from '../elements';
import styled from 'styled-components';

const CommentItem = (props) => {
    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;
    return (
        <Box>
            <Grid is_flex width="20%;" margin="0 5px;">
                <Grid width="50px;" margin="0 10px;">
                <Image shape="circle" size="38" src={user_profile} />
                </Grid>
                <Text size="1.2em" bold>{user_name}</Text>
            </Grid>
            <CommentBox>
                <Text>{contents}</Text>
                <Text width="20%;" center>{insert_dt}</Text>
            </CommentBox>
            
        </Box>
    )
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "mean0",
    user_id: "",
    post_id: 1,
    contents: "귀여운 고양이네요!",
    insert_dt: '2021-01-01 19:00:00'
}



const Box = styled.div`
max-width: 760px;
min-width: 400px;
margin: 0 auto;
border-bottom: 1px solid pink;
display: flex;
align-items: center;
`;

const CommentBox = styled.div`
display: flex;
justify-content: space-between;
width: 90%;
`;

export default CommentItem