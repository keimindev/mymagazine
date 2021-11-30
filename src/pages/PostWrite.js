import React, {useState, useRef} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from 'react-router-dom'
import { actionCreators as postActions } from '../redux/modules/post'
import { actionCreators as imgActions } from '../redux/modules/img'



import {Button, Input, Text, Grid, Image} from '../elements'
import styled from 'styled-components'


const PostWrite = () => {
   const history = useHistory();
   const dispatch = useDispatch();

   const is_uploading = useSelector((state) => state.img.uploading)

   const fileInput = useRef();
   const is_login = useSelector((state) => state.user.is_login)

   const [contents, setContents] = useState();

   const changeContents = (e) => {
    setContents(e.target.value)
   }

   const updatePost = () =>{
       dispatch(postActions.addPostFB(contents))
   }

   const selectFile = (e) => {
      console.log(e.target.files[0])
      console.log(fileInput.current.files[0])
   }

   const uploadImg = () => {
     let image = fileInput.current.files[0]
     dispatch(imgActions.uploadImgFB(image))


  }


   if(!is_login){
      return(
         <Grid margin="100px 0px" padding="1em;" center>
            <Text size="36px;" bold>앗 잠깐!</Text>
            <Text size="22px;">로그인 후에만 글을 쓸 수 있어요!</Text>
            <Button _onClick={() => {history.replace('/login');}} text="Login" />
         </Grid>
      )
   }

    return (
        <WriteBox>
         <Grid margin="2em 0;">
            <Text size="1.5em" margin="20px 0px" bold>Upload</Text>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
            <Button text="upload" _onClick={uploadImg} />
         </Grid>
         <Grid margin="3em 0;">
            <Text size="1.5em;" margin="20px 0px" bold>Preview</Text>
            <Image shape="rectangle" />
         </Grid>
         <Grid>
            <Input label="Update your story" placeholder="What's happening" _onChange={changeContents} textarea />
            <Button _onClick={updatePost}>Share</Button>
         </Grid>
        </WriteBox>
    )
}

const WriteBox = styled.div`
width: 100%;
padding: 0 2em;
margin: 5em auto;
`;


export default PostWrite
