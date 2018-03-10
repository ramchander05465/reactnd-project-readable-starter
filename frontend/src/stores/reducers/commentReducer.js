import {
    ADD_COMMENTS,
    GET_COMMENTS,
    EDIT_COMMENT,
    REMOVE_COMMETS,
    COMMENTS_VOTE
} from '../../actions/actionType'
const INIT_STATE = {
    comments: []
}
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case ADD_COMMENTS:
            return {
                ...state,
                comments:[...state['comments'],action.comments]
            }
        case EDIT_COMMENT:
            let updateComments = [...state.comments];
            for (let index = 0; index < updateComments.length; index++) {
                if(updateComments[index].id===action.comments.id){
                    updateComments[index]=action.comments;
                    break;
                };                
            }
            return {
                ...state,
                comments:updateComments
            }
        case REMOVE_COMMETS:
            const updateComment = state.comments.filter(item => item.id !== action.comment.id);
            return {
                ...state,
                comments:updateComment
            }
        case COMMENTS_VOTE:
            console.log('.....', action.vote)
            let voteOnComments = [...state.comments];
            for (let index = 0; index < voteOnComments.length; index++) {
                if(voteOnComments[index].id===action.vote.id){
                    voteOnComments[index]=action.vote;
                    break;
                };                
            }
            return {
                ...state,
                comments:voteOnComments
            }
        
        default :
            return state;
    }
}

export default reducer