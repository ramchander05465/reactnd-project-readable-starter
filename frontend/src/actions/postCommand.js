import * as api from '../utils/api';
import * as actionType from './actionType';

export const category = () => {
    return dispatch => {
        return api.fetchCategories().then(categories => dispatch({
            type : actionType.CATEGORY,
            categories
        }))
    }
}

export const addPost = (postDetails) => {
    return dispatch => {
        return api.addNewPost(postDetails).then(data => dispatch({
            type : actionType.CREATE_POST,
            data : data
        }))
    }
}

export const getPost = () => {
    return dispatch => {
        return api.fetchPosts().then(posts => dispatch({
            type : actionType.VIEW_POST,
            posts
        }))
    }
}

export const getPostById = (id) => {
    return dispatch => {
        return api.fetchPostById(id).then(post => dispatch({
            type : actionType.POST_BY_ID,
            post
        }))
    }
}

export const editPost = (postId, post) => {
    return dispatch => {
        return api.editPost(postId, post).then(post => dispatch({
            type : actionType.EDIT_POST,
            post
        }))
    }
}

export const deletePost = (id) => {
    return dispatch => {
        return api.deletePosts(id).then(post => dispatch({
            type : actionType.DELETE_POST,
            post
        }))
    }
}

export const voteOnPost = (vote, id) => {
    return dispatch => {
        return api.voteOnPost(vote, id).then(vote => dispatch({
            type : actionType.POST_VOTE,
            vote
        }))
    }
}