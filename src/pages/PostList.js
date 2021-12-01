import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'
import { Button, Grid } from '../elements'
import Post from '../components/Post'
import InfinityScroll from '../shared/InfinityScroll'

import styled from 'styled-components'
import { apiKey } from '../firebase'


const PostList = (props) => {
  const dispatch = useDispatch();
  const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_sessionKey) ? true : false

  const user_info = useSelector((state) => state.user.user)
  const post_list = useSelector((state) => state.post.list)
  const is_loading = useSelector((state) => state.post.is_loading)
  const paging = useSelector((state) => state.post.paging)

  const {history} = props;


  useEffect(() =>{
    if(post_list.length === 0){
      dispatch(postActions.getPostFB())
    }
  },[])


    return (
        <Container>
          <InfinityScroll 
          callNext ={() => {
            dispatch(postActions.getPostFB(paging.next))}}
          is_next = { paging.next ? true : false }
          loading = {is_loading}
          >
          {post_list.map((p, i) => {
             if(user_info && p.user_info.user_id === user_info.uid){
               return (
                 <Grid  key={p.id} _onClick={() => history.push(`/post/${p.id}`)}>
                   <Post {...p} is_me/>
                 </Grid>
               )
              }else{
                return (
                  <Grid  key={p.id} _onClick={() => history.push(`/post/${p.id}`)}>
                    <Post {...p} />
                  </Grid>
                )
              }
          })}
          </InfinityScroll>
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
