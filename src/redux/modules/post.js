import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {db, storage } from "../../firebase";
import moment from "moment";

import {actionCreators as imgActions} from './img'

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";
const EDIT_POST = "EDIT_POST";

const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}))
const addPost = createAction(ADD_POST, (post) => ({post}))
const loading = createAction(LOADING, (is_loading) => ({is_loading}))
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}))


const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false,
}

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name : 'min',
    //     user_profile: 'https://jjalbot.com/media/2018/12/kPq_-2zCE/zzal.jpg',

    // },
    image_url:'https://t1.daumcdn.net/section/oc/0f579edecb2c47dc973b850811d00356',
    contents: "D'oh! 오류를 발견한 내 모습",
    comment_cnt: 10,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    // insert_dt: "2021-02-27 10:00",
    likes: 20,
}

const addPostFB = (contents="") =>{
    return function(dispatch, getState, {history}){
        const postDB = db.collection("post");
        const _user = getState().user.user;
        

        console.log(_user)
        const user_info = {
            user_name: _user.userName,
            user_id: _user.uid,
            user_profile: _user.userProfile,
        }
        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        }

        const _img = getState().img.preview
        const _upload = storage
                        .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
                        .putString(_img, 'data_url')
                        
        _upload.then((snapshot) => {
                console.log('Uploaded a data_url string!');
                snapshot.ref.getDownloadURL().then((url) => {
                    console.log('File url', url);

                return url;
            }).then((url) => {

                postDB.add({...user_info, ..._post, image_url: url}).then((doc) =>{
                    let post = {user_info, ..._post, id: doc.id,  image_url: url};
                    dispatch(addPost(post))
                    history.push('/')

                    dispatch(imgActions.setPreview(null))
        
                }).catch((err) => {
                    window.alert("post 작성에 실패했어요!");
                    console.log("post 작성에 실패했어요!", err);
                })
            }).catch((err) => {
                window.alert("이미지 업로드에 실패했어요!");
                console.log("이미지 업로드에 실패했어요!", err);
            })
        })
    }

}


const getPostFB = (start= null, size =3) =>{
   return function( dispatch, getState, {history}){

    let _paging = getState().post.paging;
    if(_paging.start && !_paging.next){
        return;
    }
       dispatch(loading(true))
       const postDB = db.collection("post");

       let query = postDB.orderBy("insert_dt", "desc")

       if(start){
          query = query.startAt(start);
       }

       query
            .limit(size + 1)
            .get()
            .then(docs => {
                let post_list = [];

                let paging = {
                    start: docs.docs[0],
                    next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length -1 ] : null,
                    size: size,
                }

            docs.forEach((doc) =>{
                let _post = doc.data();

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

            post_list.push(post);

            })
            post_list.pop();

            dispatch(setPost(post_list, paging))       
        })

    }
}


const editPostFB = (post_id= null, post = {}) =>{
 return function(dispatch, getState, {history}){

    if(!post_id){
        console.log("정보가 없습니다")
        return ;
    }

    const _image = getState().img.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id)
    const _post = getState().post.list[_post_idx];
    
    const postDB = db.collection("post");

    if(_image === _post.image_url){
        postDB.doc(post_id).update(post).then((doc) =>{

            //contents eidt
            dispatch(editPost(post_id, {...post}))
            history.replace("/")
        })

        return;
    }else{
        const user_id = getState().user.user.uid;
        const _upload = storage
                        .ref(`images/${user_id}_${new Date().getTime()}`)
                        .putString(_image, 'data_url')
                        
        _upload.then((snapshot) => {
                console.log('Uploaded a data_url string!');
                snapshot.ref.getDownloadURL().then((url) => {
                    console.log('File url', url);

                return url;
            }).then((url) => {
                postDB
                .doc(post_id)
                .update({...post, image_url : url})
                .then((doc) =>{
                    dispatch(editPost(post_id, {...post, image_url : url}))
                    history.replace("/")
                })
            }).catch((err) => {
                window.alert("이미지 업로드에 실패했어요!");
                console.log("이미지 업로드에 실패했어요!", err);
            })
        })
       
    }

 }
}


export default handleActions(
    {
        [SET_POST] : (state, action) => produce(state, (draft) =>{
            //new list return 
            draft.list.push(...action.payload.post_list)
            draft.paging = action.payload.paging;
            draft.is_loading = false;

        }),

        [ADD_POST] : (state, action) => produce(state, (draft) =>{
            draft.list.unshift(action.payload.post)
        }),

        [LOADING] : (state, action) => produce(state, (draft) =>{
            draft.is_loading = action.payload.is_loadinig
        }),

        [EDIT_POST] : (state, action) => produce(state, (draft) => {
          let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

          draft.list[idx] = { ...draft.list[idx], ...action.payload.post};
        }) 

    }, initialState
)

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    editPostFB ,

}

export { actionCreators }