import React, {useEffect, useState} from 'react'
import Post from "../components/Post"

import {useSelector} from 'react-redux'
import {db} from '../firebase'

function PostDetail(props) {
    const id = props.match.params.id;

    const user_info = useSelector((state) => state.user.user);
    const post_list = useSelector(state => state.post.list);
    const post_idx = post_list.findIndex((p) => p.id === id)
    const post_data = post_list[post_idx]

    const [post, setPost] = useState(post_data ? post_data : null);

    useEffect(() =>{

        if(post){
            return;
        }
        const postDB = db.collection("post")
        postDB.doc(id).get().then(doc => {

            let _post = doc.data()
            let post = Object.keys(_post).reduce((acc, cur) => {

                if(cur.indexOf("user_") !== -1){
                    return {
                        ...acc, 
                        user_info: {...acc.user_info, [cur]: _post[cur]}
                    }
                }
                    return {...acc, [cur] :_post[cur] }

                },{id: doc.id, user_info: {}}
                
                );

                setPost(post)

        })

    },[])

    return (
        <>
         {post && <Post {...post} is_del={post.user_info.user_id === user_info.uid} /> }
        </>
    )
}

export default PostDetail
