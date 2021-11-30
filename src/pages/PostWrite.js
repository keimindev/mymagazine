import React from 'react'
import {Button, Input, Text, Grid} from '../elements'

import styled from 'styled-components'


const PostWrite = () => {
    return (
        <WriteBox>
         <Grid margin="2em 0;">
            <Text size="2em" bold>Upload</Text>
            <Input type="file" label="" />
         </Grid>
         <Grid margin="3em 0;">
            <Text size="2em;" bold>Preview</Text>
            <PreImg /> 
            <Text></Text>
         </Grid>
         <Grid>
            <Text size="1em;" bold>What's Happening?</Text>
            <TextArea />
            <Button>Share</Button>
         </Grid>
        </WriteBox>
    )
}

const WriteBox = styled.div`
width: 100%;
padding: 0 2em;
margin: 5em auto;
`;

const PreImg = styled.div`
height: 300px;
object-fit: cover;
`;

const TextArea = styled.textarea`
width: 100%;
height: 200px;
margin: 0.7em auto;
`;
export default PostWrite
