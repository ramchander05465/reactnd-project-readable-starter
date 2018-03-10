import * as api from '../utils/api';
import * as actionType from './actionType';

export const addComment = (comment) => {
    return dispatch => {
        return api.addComments(comment).then(comments => dispatch({
            type:actionType.ADD_COMMENTS,
            comments
        }))
    }
}

export const getComments = (postId) => {
    return dispatch => {
        return api.getComments(postId).then(comments => dispatch({
            type:actionType.GET_COMMENTS,
            comments
        }))
    } 
}

export const editComments = (data) => {
    return dispatch => {
        return api.editComments(data).then(comments => dispatch({
            type:actionType.EDIT_COMMENT,
            comments
        }))
    } 
}

export const deleteComments = (id) => {
    return dispatch => {
        return api.deleteComments(id).then(comment => dispatch({
            type:actionType.REMOVE_COMMETS,
            comment
        }))
    } 
}

export const voteOnComment = (vote, id) => {
    return dispatch => {
        return api.voteOnComments(vote, id).then(vote => dispatch({
            type:actionType.COMMENTS_VOTE,
            vote
        }))
    }
}