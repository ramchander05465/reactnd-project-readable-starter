import {
    ADD_COMMENTS,
    GET_COMMENTS,
    EDIT_COMMENT,
    REMOVE_COMMETS,
    COMMENTS_VOTE
} from '../../actions'
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
            //const updateComment = state.comments.filter(item => item.id !== action.comment.id);
            console.log(action.vote)
            return {
                ...state
            }
        
        default :
            return state;
    }
}

export default reducer