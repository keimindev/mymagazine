import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import {auth} from "../../firebase";

const initialState = {
    user: null,
    is_login: false,
}


//action
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER"

//action creator
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}));

//middlewaare actions
const loginAction = (user) => {
 return function (dispatch, getState, {history}){
     console.log(history);
     dispatch(setUser(user));
     history.push('/');
 }
}

const signupFB = (id, pw, userName) => {
    return function( dispatch, getState, {history}){
        auth.createUserWithEmailAndPassword(id, pw)
        .then((user) => {

            console.log(user);
            auth.currentUser.updateProfile({
                displayName: userName
            }).then(() => {
                dispatch(setUser({userName: userName, id: id, userProfile: ''}))
                history.push('/')
            }).catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    }
}



//reducer
export default handleActions({
    [SET_USER] : (state, action) => produce( state, (draft) => {
      setCookie("is_login", "success");
      draft.user = action.payload.user;
      draft.is_login = true;
    }), 
    [LOG_OUT] : (state, action) => produce( state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }), 
    [GET_USER] : (state, action) => produce( state, (draft) => {}), 
}, initialState);

//action creator export
const actionCreators={
    logOut,
    getUser,
    loginAction,
    signupFB,
};

export { actionCreators };