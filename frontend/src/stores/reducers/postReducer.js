import * as posts from '../../actions';

const INIT_STEATE = {
    posts:[],
    categories:[]
};

const postReducer = (state = INIT_STEATE, action) => {
    switch(action.type){
        case posts.CATEGORY:
            return{
                ...state, 
                categories:action.categories   
            }
        case posts.CREATE_POST:
            return {
                ...state
            }
        case posts.VIEW_POST:
            return{
                ...state,
                posts:action.posts
            }
        case posts.EDIT_POST:
            return{
                ...state
            }
        case posts.DELETE_POST:
        const updatePost = state.posts.filter(item => item.id !== action.post.id);
            return{
                ...state,
                posts:updatePost
            }
        case posts.POST_VOTE:
            return {
                ...state
            }
        default:
            return state;
    }
};

export default postReducer