import * as api from '../utils/api';
export const CATEGORY = 'CATEGORY';
export const CREATE_POST = 'CREATE_POST';
export const VIEW_POST  =   'VIEW_POST';
export const EDIT_POST  = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const POST_VOTE = 'POST_VOTE';
export const ADD_COMMENTS = "ADD_COMMENTS"
export const GET_COMMENTS = 'GET_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMETS = 'REMOVE_COMMENTS';
export const COMMENTS_VOTE = 'COMMENTS_VOTE';

export const category = () => {
    return dispatch => {
        return api.fetchCategories().then(categories => dispatch({
            type:CATEGORY,
            categories
        }))
    }
}
export const addPost = (postDetails) => {
    return dispatch => {
        return api.addNewPost(postDetails).then(data => dispatch({
            type:CREATE_POST,
            data:data
        }))
    }
}

export const getPost = () => {
    return dispatch => {
        return api.fetchPosts().then(posts => dispatch({
            type:VIEW_POST,
            posts
        }))
    }
}

export const editPost = () => {
    return{
        type:EDIT_POST,
        payload:{}
    }
}

export const deletePost = (id) => {
    return dispatch => {
        return api.deletePosts(id).then(post => dispatch({
            type:DELETE_POST,
            post
        }))
    }
}

export const voteOnPost = (vote, id) => {
    return dispatch => {
        return api.voteOnPost(vote, id).then(vote => dispatch({
            type:POST_VOTE,
            vote
        }))
    }
}

export const addComment = (comment) => {
    return dispatch => {
        return api.addComments(comment).then(comments => dispatch({
            type:ADD_COMMENTS,
            comments
        }))
    }
}

export const getComments = (postId) => {
    return dispatch => {
        return api.getComments(postId).then(comments => dispatch({
            type:GET_COMMENTS,
            comments
        }))
    } 
}

export const editComments = (data) => {
    return dispatch => {
        return api.editComments(data).then(comments => dispatch({
            type:EDIT_COMMENT,
            comments
        }))
    } 
}

export const deleteComments = (id) => {
    return dispatch => {
        return api.deleteComments(id).then(comment => dispatch({
            type:REMOVE_COMMETS,
            comment
        }))
    } 
}

export const voteOnComment = (vote, id) => {
    return dispatch => {
        return api.voteOnComments(vote, id).then(vote => dispatch({
            type:COMMENTS_VOTE,
            vote
        }))
    }
}