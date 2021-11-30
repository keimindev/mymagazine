import React from 'react'
import {useHistory} from 'react-router-dom'
import Post from '../components/Post'
import { Button } from '../elements'
import styled from 'styled-components'
import { apiKey } from '../firebase'

const PostList = () => {
  const history = useHistory();
  const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_sessionKey) ? true : false
    return (
        <Container>
          <Post/>
          <Post/>
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
