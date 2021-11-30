import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import {auth} from "../../firebase";
import firebase from "firebase/compat/app";

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
const signupFB = (id, pw, userName) => {
    return function( dispatch, getState, {history}){
        auth.createUserWithEmailAndPassword(id, pw)
        .then((user) => {

            console.log(user);
            auth.currentUser.updateProfile({
                displayName: userName
            }).then(() => {
                dispatch(setUser({userName: userName, id: id, userProfile: '', uid: user.user.uid}))
                history.push('/')
            }).catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
         console.log(errorCode, errorMessage)
        });
    }
}



const loginFB = (id, pw) => {
  return function(dispatch, getState, {history}){
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then((res) => {
        //login start
        auth.signInWithEmailAndPassword(id, pw)
        .then((user) => {
            console.log(user)
            dispatch(
                setUser({
                userName: user.user.displayName, 
                id: id, 
                userProfile: '',
                uid: user.user.uid,
            }
            ))
            history.push('/')
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
      });

    })
  }
}

const loginCheckFB =() =>{
    return function(dispatch, getState, {history}){
        //user가 있느 없나
        auth.onAuthStateChanged((user) => {
            if(user){
               dispatch(
                   setUser({
                        userName: user.displayName, 
                        id: user.email, 
                        userProfile: '',
                        uid: user.uid,
                    }))
            }else{
                dispatch(logOut())
            }
        })
    }
}


const logoutFB =() =>{
    return function(dispatch, getState, {history}){
       auth.signOut().then( () => {
           dispatch(logOut());
           history.replace('/');
       })
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
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB,
};

export { actionCreators };