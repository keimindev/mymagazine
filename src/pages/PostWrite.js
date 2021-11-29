import React from 'react'
import {Button, Input, Text, Grid} from '../elements'

import styled from 'styled-components'


const PostWrite = () => {
    return (
        <WriteBox>
         <Grid margin="2em 0;">
         <Text size="2em" bold>Upload</Text>
         <input type="file" />
         </Grid>
         <Grid margin="3em 0;">
         <Text size="2em;" bold>Preview</Text>
         <div>priview img</div>
         <Text></Text>
         </Grid>
         <Grid>
         <Input label="게시물" height="400px;"/>
         <Button width="400px;">Share</Button>
         </Grid>
        </WriteBox>
    )
}

const WriteBox = styled.div`
width: 700px;
min-width: 400px;
margin: 5em auto;
`;
export default PostWrite
