import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'
import { Button } from '../elements'

import styled from 'styled-components'
import { apiKey } from '../firebase'

const PostList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_sessionKey) ? true : false


  const post_list = useSelector((state) => state.post.list)

  useEffect(() =>{
    dispatch(postActions.getPostFB())
  },[])


  console.log(post_list)

    return (
        <Container>
          {post_list.map((p, i) => {
            return<Post key={p.id} {...p} />
          })}
          {is_session ? <Button is_float _onClick={()=> history.push('/write')}/> : <></>}
        </Container>
    )
}

const Container = styled.div`
max-width: 1280px;
min-width: 400px;
margin: 0 auto;
padding: 1em 0em;

`;

export default PostList
