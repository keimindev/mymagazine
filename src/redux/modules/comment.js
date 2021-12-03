import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {db } from "../../firebase";
import moment from "moment";


import firebase from "firebase/compat/app"
import { actionCreators as postActions } from "./post";



const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};


const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, {history}){
    const commentDB = db.collection('comment');
    const user_info = getState().user.user;
    console.log(user_info)

    let comment = {
      post_id: post_id,
      user_id : user_info.uid,
      user_name: user_info.userName,
      user_profile : user_info.userProfile,
      contents: contents,
      insert_dt : moment().format("YYYY-MM-DD hh:mm:ss"),
    }

    commentDB.add(comment).then((doc) => {
      const postDB = db.collection("post");
      
      //redux info
      const post = getState().post.list.find( l => l.id === post_id);

      const increment = firebase.firestore.FieldValue.increment(1);
      // let a = 5; a + a + 1 comment_cnt + 1
      comment = {...comment, id: doc.id}
      postDB.doc(post_id).update({comment_cnt: increment}).then((_post) =>{
        dispatch(addComment(post_id, comment));

        if(post){
            dispatch(postActions.editPostFB(post_id, {comment_cnt: parseInt(post.comment_cnt) + 1}));
        }

      })
    })
  }

}
const getCommentFB = (post_id = null) => {
    return  function (dispatch, getState, {history}){
      const commentDB = db.collection("comment");
       if(!post_id){
           return;
       }
      
        commentDB.where("post_id","==", post_id)
                 .orderBy("insert_dt", "desc")
                 .get().then((docs) =>{
                     let list =[];
                     
                     docs.forEach((doc) =>{
                      console.log(doc.data())
                         list.push({...doc.data(), id: doc.id});
                     })

                     dispatch(setComment(post_id, list));
                 }).catch(err => { 
                     console.log("댓글 정보를 가져올 수가 없네요!", err);
                 })
}
}


export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
          draft.list[action.payload.post_id] = action.payload.comment_list;

      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        console.log(action.payload.post_id)
          draft.list[action.payload.post_id].push(action.payload.comment);

      }),
      [LOADING]: (state, action) => 
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };