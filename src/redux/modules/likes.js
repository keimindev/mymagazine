import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {db } from "../../firebase";
import moment from "moment";


import firebase from "firebase/compat/app"
import { actionCreators as postActions } from "./post";

const SET_LIKE = "SET_LIKE";


const setLike = createAction(SET_LIKE, (user_id, post_id, cnt) => ({user_id, post_id, cnt}));
const initialState = {
    list: {},
  };


const setLikeFB = (post_id, cnt) =>{
    return function(dispatch, getState, {history}){
        const likeDB = db.collection("like")
        const user_info = getState().user.user;

        let like = {
            cnt: cnt,
            post_id : post_id,
            user_id : user_info.uid,
        }

        likeDB.add(like).then((doc)=>{
            const postDB = db.collection("post");
            

            const post = getState().post.list.find( l => l.id === post_id);

           if(cnt === false){
            const increment = firebase.firestore.FieldValue.increment(1);

            like = { ...like, id: doc.id }
            postDB.doc(post_id).update({likes: increment}).then((_post) => {
                dispatch(setLike(post_id, like));

                if(post){
                    dispatch(postActions.editPostFB(post_id, {likes : parseInt(post.likes) + 1}));
                }
            })
            
           }else{
               return;
           }

        })
    }
}





  export default handleActions(
    {
        [SET_LIKE]: (state, action) => produce(state, (draft) => {
            draft.list[action.payload.post_id] = action.payload.cnt;
  
        }),
        // [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        //   console.log(draft.list[action.payload.post_id])
        //     draft.list[action.payload.post_id].push(action.payload.comment);
  
        // }),
        // [LOADING]: (state, action) => 
        // produce(state, (draft) => {
        //   draft.is_loading = action.payload.is_loading;
        // })
    },
    initialState
  );
  
  const actionCreators = {
     setLike,
     setLikeFB,
  };
  
  export { actionCreators };