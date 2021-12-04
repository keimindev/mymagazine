import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';
import { actionCreators as postActions } from './post';

const IS_LIKE = 'IS_LIKE';
const GET_LIKE = 'GET_LIKE';

const isLike = createAction(IS_LIKE, (is_like) => ({ is_like }));
const getLike = createAction(GET_LIKE, (post_id, list) => ({post_id, list})); 

const initialState = {
  list: {},
  is_like: false,
};

const setLikeFB = (post_id, user_id) => {
  return function (dispatch, getState, { history }) {
    const likeDB = db.collection('like');
    let _like = {
      post_id: post_id,
      user_id: user_id,
      is_like: true,
    };

    likeDB.add(_like).then((doc) => {
      const postDB = db.collection('post');
      const post = getState().post.list.find((val) => val.id === post_id);
      const increment = firebase.firestore.FieldValue.increment(1);
      postDB
        .doc(post_id)
        .update({ likes: increment })
        .then((res) => {
          dispatch(
            postActions.editPost(post_id, { likes: parseInt(post.likes) + 1 }),
          );
        });
      dispatch(isLike(true));
    });
  };
};


const disLikeFB = (post_id, user_id) => {
  return function (dispatch, getState, { history }) {
    const likeDB = db.collection('like');
    likeDB
      .where('post_id', '==', post_id)
      .get()
      .then((docs) => {
        let likes = [];
        docs.forEach((doc) => {
          likes.push({ ...doc.data(), id: doc.id });
        });
        const user_like = likes.filter((d) => {
          return d.user_id === user_id;
        });

        likeDB
          .doc(user_like[0].id)
          .delete()
          .then((doc) => {
            const postDB = db.collection('post');
            const post = getState().post.list.find((p) => p.id === post_id);
            const decrement = firebase.firestore.FieldValue.increment(-1);
            postDB
              .doc(post_id)
              .update({ likes: decrement })
              .then((res) => {
                dispatch(
                  postActions.editPost(post_id, {
                    likes: parseInt(post.likes) - 1,
                  }),
                );
              });
            dispatch(isLike(false));
          });
      });
  };
};

const getLikeFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    const likeDB = db.collection("like");

    likeDB
      .where("post_id", "==", post_id)
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push(doc.data().user_id);
        });

        dispatch(getLike(post_id, list));
      })
      .catch((error) => {
        console.log("좋아요 정보를 가져올 수가 없어요", error);
      });
  };
};


export default handleActions(
  {
    [IS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = action.payload.is_like;
      }),
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.list;
      }),
  },
  initialState,
);

const actionCreators = {
  setLikeFB,
  disLikeFB,
  getLikeFB,
  isLike,
};

export { actionCreators };