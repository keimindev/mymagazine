import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { history } from '../redux/configStore';
import {actionCreators as likesActions} from '../redux/modules/likes'
import   { apiKey } from '../firebase'

import { Grid, Button, Text } from '../elements';



const Like = (props) => {
    const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_sessionKey) ? true : false
    
    const dispatch = useDispatch();
    const id = props.id;
    const user_id = useSelector((state)=> state.user.user?.uid)

    let is_like = useSelector((state) => state.likes.is_like)
    const like_list = useSelector(state => state.likes.list);
    const [getlikes, setGetLikes] = useState(false);

    useEffect(() => {
        dispatch(likesActions.isLike(false));
        dispatch(likesActions.getLikeFB(id));
        if (like_list[id]?.includes(user_id)) {
          setGetLikes(true);
        } else {
          setGetLikes(false);
        }
      },[dispatch]);
    

    //post_id 정보없음 return
    if(!id){
        return null
    }

    const clickedLike = () =>{
        if (!is_like) {
            dispatch(likesActions.setLikeFB(id, user_id));
            setGetLikes(true);
          } else{
            dispatch(likesActions.disLikeFB(id, user_id));
            setGetLikes(false);
          }
    }

    const movetoLogin =() =>{
        history.push('/login')
    }

    return (
    <>
        {is_session ? (
            <Grid is_flex width="2.5em;" _onClick={clickedLike}>
            { getlikes ?  ( 
            <Button bg="#fff;" width="40px;"
            >💜</Button>
            ) : (
            <Button bg="#fff;" width="40px;"
            >🤍</Button>)}
            <Text>{props.likes}</Text>
            </Grid>
        ) : ( 
            <Grid is_flex width="2.5em;" _onClick={movetoLogin}>
            { getlikes ?  ( 
            <Button bg="#fff;" width="40px;"
            >💜</Button>
            ) : (
            <Button bg="#fff;" width="40px;"
            >🤍</Button>)}
            <Text>{props.likes}</Text>
            </Grid>  
        )}
    </>
    )
}

export default Like
