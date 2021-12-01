import React, {useState, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {history} from '../redux/configStore'
import { actionCreators as postActions } from '../redux/modules/post'
import { actionCreators as imgActions } from '../redux/modules/img'



import {Button, Input, Text, Grid, Image} from '../elements'
import styled from 'styled-components'


const PostWrite = (props) => {
   const dispatch = useDispatch();
   const { history } = props;


   const preview = useSelector((state) => state.img.preview)
   const is_uploading = useSelector((state) => state.img.uploading)
   const post_list = useSelector((state) => state.post.list)

   const fileInput = useRef();
   const is_login = useSelector((state) => state.user.is_login)

  //edit post
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  let _post = is_edit? post_list.find((p) => p.id === post_id) : null

  useEffect(() => {
    if(is_edit && !_post){
       console.log('포스트 정보가 없어요');
       history.goBack();
    }

    if(is_edit){
       dispatch(imgActions.setPreview(_post.image_url))
    }
  }, [])

   
   const [contents, setContents] = useState(_post? _post.contents : "");


   //preview 
   const changeContents = (e) => {
    setContents(e.target.value)
   }

   const updatePost = () =>{
       dispatch(postActions.addPostFB(contents))
   }

   const selectFile = (e) => {
      const reader = new FileReader();
      const file = fileInput.current.files[0]

      reader.readAsDataURL(file);
      reader.onloadend =() => {
         dispatch(imgActions.setPreview(reader.result))
      }

   }

   const uploadImg = () => {
     let image = fileInput.current.files[0]
     dispatch(imgActions.uploadImgFB(image))
  }



  const editPost = () =>{
     dispatch(postActions.editPostFB(post_id, {contents: contents}))
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
            {is_edit ? (<
               Text size="1.5em" margin="20px 0px" bold>수정하기</Text>
               ) : (
               <Text size="1.5em" margin="20px 0px" bold>Upload</Text>
            )}
            
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
            <Button text="upload" _onClick={uploadImg} />
         </Grid>
         <Grid margin="3em 0;">
            <Text size="1.5em;" margin="20px 0px" bold>Preview</Text>
            <Image shape="rectangle" src={preview ? preview : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDRUPDw8VFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ0NFSsZFR0rKy0tKysrKystKy0tLSsrNy03KystLSsrKy0tKzctKy0tKy0rLS0rKy0rLS0rKysrK//AABEIAMQBAQMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAJRABAAIBAgUEAwAAAAAAAAAAAAHwETGhIUGRsdECUWHhcYHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAIf/aAAwDAQACEQMRAD8A7gAgl/KiACgCXVUugHRS8kuoF4gAAAF9wFLoX3LqAACAKAhdVBLqqXQAvAFAAAAAx8icAFAAAAAAABFAAABFARQAvJFAS2FAAABLot0AAAAAAAAAMgKACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH7AAAAAAAABQAAAAAARQAAAAAAAAAAAAABAAAAAAUAAAAAAEUAQBUAAAAABRAUQBQAAAAAABAAAMgAAAAoAAACCoCoACoAAIAAACgAACgAAAAAAAAACAAAAoAAAAACKIAoAgqIAqAqKiioogigoAAAAAAACGQwFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQFRAEAAAAAAAAUAAAAAlAAAAUAAAAAAABAAAADAAAAAAAAoAAAAAACIKJkBRDIKIAoCgAAAAAIAAAAomFBBAFEBQAAEBRAFBAATKCiEAsjOVBRMqCiKoCAKIoCoAogIogCDWYBUAAELdgVC28gAJJkAygC5EMgAZBJORMHqQCJI1MAoQYUFymQFEAUIIvUALehbsCiW3mtt5AAAvEZ4e4It2S7AKs634QAL3L2QEX7RAVS9vIACALKABBOoAHqACVQBZEAWDwAI15QBYu5F2AQi7F2+wFW/wu+ABrACo/9k=' } />
         </Grid>
         <Grid>
            <Input label="Update your story" placeholder="What's happening" _onChange={changeContents} textarea value={contents} />
            {is_edit ? (
                <Button text = "Edit" _onClick={editPost} margin="10px 0;" />
            ) : (
               <Button text="Share" _onClick={updatePost} margin="10px 0;"/>
            )}
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
