import jsonPlaceHolder from './../apis/jsonPlaceHolder';
import _ from 'lodash';

// export const fetchPosts = () => {
//     // return function (dispatch, getState) {
//     //     const response = jsonPlaceHolder.get('/posts');
//     //     return {
//     //         type: 'FETCH_POSTS',
//     //         payload: response
//     //     }
//     // }

//     // return async function(dispatch, getState) {
//     //     const response = jsonPlaceHolder.get('/posts');
//     //     dispatch({type: 'FETCH_POSTS', payload: response});
//     // }
// }

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceHolder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data })
}

// export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const user = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USER', payload: user.data })
// });


export const fetchUser = (id) => async dispatch => {
    const user = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: user.data })
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // console.log(getState().posts)
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // console.log('userIds: ', userIds);
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // console.log(getState().users);
    _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)));
}