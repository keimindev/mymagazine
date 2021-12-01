import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import {storage} from "../../firebase";


const UPLOADING = "UPLOADING";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW"; 

const uploading = createAction(UPLOADING, (uploading) => ({uploading}))
const uploadImg = createAction(UPLOAD_IMG, (img_url) => ({img_url}))
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}))

const initialState = {
    img_url : '',
    uploading: false,
}


const uploadImgFB = (image) => {
    return function(dispatch, getState, {history}){

        dispatch(uploading(true))
        //업로드
        const _upload =  storage.ref(`images/${image.name}`).put(image);

        _upload.then(function(snapshot) {
            console.log('Uploaded a blob or file!');

            //가져오기
            snapshot.ref.getDownloadURL().then((url) => {
                dispatch(uploadImg(url))
            console.log('File available at', url);
        });
    }).catch(err =>{
        dispatch(uploading(false))
    })
 }
}


export default handleActions({
    [UPLOAD_IMG]: (state, action) => produce(state, (draft) => {
        draft.img_url = action.payload.img_url;
        draft.uploading = false;

    }),

    [UPLOADING]: (state, action) => produce(state, (draft) => {
        draft.uploading = action.payload.uploading;

    }),

    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.preview = action.payload.preview;

    }),


}, initialState);

const actionCreators = {
    uploading,
    uploadImg,
    uploadImgFB,
    setPreview,
}

export { actionCreators }