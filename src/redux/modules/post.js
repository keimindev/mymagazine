import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {db, storage } from "../../firebase";
import moment from "moment";

import {actionCreators as imgActions} from './img'

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const addPost = createAction(ADD_POST, (post) => ({post}))


const initialState = {
    list: []
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


const getPostFB = () =>{
   return function( dispatch, getState, {history}){
       const postDB = db.collection("post");

       postDB.get().then((docs) => {
           //뿌려지는 것은 list 배열이다. post값을 list배열에 넣어줘야한다
           let post_list = [];

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


            //    let _post = {
            //        id: doc.id,
            //        ...doc.data()
            //    };

            //    let post = {
            //        id:doc.id,
            //        user_info: {
            //         user_name :  _post.user_name,
            //         user_profile: _post.user_profile,
            //         user_id: _post.user_id,
            
            //         },
            //         image_url:_post.img_url,
            //         contents: _post.contents,
            //         comment_cnt: _post.comment_cnt,
            //         insert_dt: _post.insert_dt,
            //         likes_cnt: _post.likes_cnt,

            //    };

            //   post_list.push(post)

           })


           dispatch(setPost(post_list))

       })

   }
}




export default handleActions(
    {
        [SET_POST] : (state, action) => produce(state, (draft) =>{
            //new list return 
            draft.list = action.payload.post_list;

        }),

        [ADD_POST] : (state, action) => produce(state, (draft) =>{
            draft.list.unshift(action.payload.post)
        }),
    }, initialState
)

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
}

export { actionCreators }