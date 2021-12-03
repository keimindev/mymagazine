import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";



const initialState = {
    list: {}
}

const ADD_LIKE = 'ADD_LIKE'

const addLikePost = createAction(ADD_LIKE, (post_id, likes) => ({post_id, likes}))


// const addLikePostFB = (post_id, user_id) =>{
//     return function(dispatch, getState, {history}){
//         const likeDB = db.collection("likes")
//         const _like = getState().like.post_id
//         console.log(_like)
//         const docRef = likeDB.doc(post_id)
        
//         docRef.get().then((doc) => {
//             if(doc.data()){
//                 let list = [...doc.data().likes, user_id]
//                 docRef.update({
//                     likes: list
//                 })

//                 dispatch(addLikePost(post_id,list))
//             }else{
//                 likeDB.doc(post_id).set({ likes: [user_id] })
//                 dispatch(addLikePost(post_id, user_id))
//             }
//         })
        

//     }
// }


const delLikePostFB = (post_id, user_id) =>{
    return function (dispatch, getState, { history }) {
        const likeDB = db.collection('likes')
        const docRef = likeDB.doc(post_id)
    
        docRef.get().then((doc) => {
          let _list = doc.data().likes.filter((d) => d !== user_id)
          docRef.update({
            likes: _list
          })
          dispatch(addLikePost(_list, user_id))
        })
      }
  }

  const loadLikes = (post_id) => {
    return function (dispatch, getState, { history }) {
      const likeDB = db.collection('likes')
      const docRef = likeDB.doc(post_id)
      docRef.get().then((doc) => {
        if (doc.data()) {
          const _like = doc.data().likes
          dispatch(addLikePost(_like, post_id))
        }
      })
    }
  }


const likePostFB = (post_id) => {
    return function (dispatch, getState, {history}){
        const postDB = db.collection("post")
        const docRef = postDB.doc(post_id)
        console.log(post_id, docRef)
        docRef.get().then((doc) =>{
            docRef.update({
                likes: doc.data().likes + 1,
            })
            
        })
    }
}

const cancelLikeFB = (post_id) => {
    return function (dispatch, getState, {history}){
        const postDB = db.collection("post")
        const docRef = postDB.doc(post_id)
        console.log(post_id, docRef)
        docRef.get().then((doc) =>{
            docRef.update({
                likes: doc.data().likes - 1,
            })
            
        })
    }
}



export default handleActions({
    [ADD_LIKE] : (state, action) => produce(state, (draft) =>{
        draft.post_id = action.payload.post_id
        draft.likes = [...draft.likes, {likes : action.payload.user_id}]
    }),

}, initialState )


const actionCreators = {
    likePostFB,
    cancelLikeFB,
    // addLikePostFB,
    delLikePostFB,
    loadLikes,
}

export { actionCreators }