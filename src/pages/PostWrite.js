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
   const [direction, setDirection] = useState("center");
   const [empty, setEmpty] = useState(fileInput.current ? true : false);


   const changeDirection = (e) =>{
      setDirection(e.target.value)
   }


   //preview 
   const changeContents = (e) => {
    setContents(e.target.value)
   }

   const updatePost = () =>{
      dispatch(postActions.addPostFB(contents,direction))
   }

   const selectFile = (e) => {
      const reader = new FileReader();
      const file = fileInput.current.files[0]
      setEmpty(file)
      reader.readAsDataURL(file);
      reader.onloadend =() => {
         dispatch(imgActions.setPreview(reader.result))
      }



   }

//    const uploadImg = () => {
//      let image = fileInput.current.files[0]
//      dispatch(imgActions.uploadImgFB(image))
//   }



  const editPost = () =>{
     dispatch(postActions.editPostFB(post_id, {contents: contents, direction: direction}))
  }

   if(!is_login){
      return(
         <Grid width="400px;" margin="100px auto;" padding="1em;" center>
            <Text size="36px;" margin="20px 0px" bold center>앗 잠깐!</Text>
            <Text size="22px;" margin="20px 0px" >로그인 후에만 글을 쓸 수 있어요!</Text>
            <Button _onClick={() => {history.replace('/login');}} text="Login" />
         </Grid>
      )
   }

    return (
        <WriteBox>
           <InnerBox>
         <Grid margin="2em 0;">
            {is_edit ? (<
               Text size="1.5em" margin="20px 0px" bold>수정하기</Text>
               ) : (
               <Text size="1.5em" margin="20px 0px" bold>Upload</Text>
            )}
            
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
        
         </Grid>
         <Grid margin="3em 0;">
            <Text size="1.5em;" margin="20px 0px" bold>레이아웃 선택</Text>
            <input 
            type="radio" 
            value="right"
            onChange={changeDirection} 
            checked ={direction === "right" ? true : false} 
            /> 오른쪽
            <Grid is_flex margin="1em 0 2em 0;">
               <Text width="50%;" center>{contents}</Text>
               <Grid width="500px;">
                  <Image shape="rectangle" src={preview ? preview : 'https://camfitt.com/static/media/empty.a5238aed.jpg' } />
               </Grid>
            </Grid>
            <input 
            type="radio" 
            value="left"
            onChange={changeDirection}  
            checked ={direction === "left" ? true : false}/> 
            왼쪽
            <Grid is_flex margin="1em 0 2em 0;">
               <Grid width="500px;">
                  <Image shape="rectangle" src={preview ? preview : 'https://camfitt.com/static/media/empty.a5238aed.jpg' } />
               </Grid>
               <Text width="50%" center>{contents}</Text>
            </Grid>
            <input 
            type="radio" 
            value="center"
            onChange={changeDirection}  
            checked ={direction === "center" ? true : false}
            /> 중앙
            <Grid margin="1em 0 2em 0;">
               <Text margin=" 2em 0;">{contents}</Text>
               <Image shape="rectangle" src={preview ? preview : 'https://camfitt.com/static/media/empty.a5238aed.jpg' } />
            </Grid>
         </Grid>
         <Grid>
            <Input 
            label="Update your story" 
            placeholder="What's happening" 
            _onChange={changeContents} 
            textarea value={contents} />

            {is_edit ? (
                <Button _onClick={editPost} margin="10px 0;">Edit</Button>
            ) : (
               <Button _onClick={updatePost} margin="10px 0;" disabled={ contents && empty ? false : true}>Share</Button>
            )}
         </Grid>
         </InnerBox>
        </WriteBox>
    )
}

const WriteBox = styled.div`
width: 100%;
padding: 0 2em;
margin: 5em auto;
box-sizing: border-box;
`;

const InnerBox = styled.div`
max-width: 980px;
min-width: 300px;
margin: 0 auto;
`

export default PostWrite
