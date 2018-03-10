import * as actionType from '../../actions/actionType';

const INIT_STEATE = {
    posts:[],
    categories:[]
};

const postReducer = (state = INIT_STEATE, action) => {
    switch(action.type){
        case actionType.CATEGORY:
            return{
                ...state, 
                categories:action.categories   
            }
        case actionType.CREATE_POST:
            return {
                ...state
            }
        case actionType.VIEW_POST:
            
            return{
                ...state,
                posts:action.posts
            }
        case actionType.EDIT_POST:
            return{
                ...state
            }
        case actionType.DELETE_POST:
            const updatePost = state.posts.filter(item => item.id !== action.post.id);
                return{
                    ...state,
                    posts:updatePost
                }
        case actionType.POST_VOTE:
            let postList = [...state.posts];
            for (let index = 0; index < postList.length; index++) {
                if(postList[index].id===action.vote.id){
                    postList[index]=action.vote;
                    break;
                };                
            }
            return {
                ...state,
                posts:postList
            }
        default:
            return state;
    }
};

export default postReducer