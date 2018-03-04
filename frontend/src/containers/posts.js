import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionType from '../actions';
import PostList from '../components/postList';
import {Form, FormGroup, Input} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';

class Posts extends Component {

    state = {
        field:'',
        voteScore:true,
        timestamp:true,
        category:"all"
    }

    
    componentDidMount = () => {        
        this.props.getPosts();
    }

    notify = (status) => {     
        return this.toastId = toast(status, { autoClose: true });
    }

    renderCategories = () =>{
    return this.props.categories.map(category => <option key={category.name}>{category.name}</option>)
    }

    deletePostHandler = (id) => {
        this.props.deletePosts(id)
            .then(res => this.notify('Post has been delete successfully'));
    }

    getCategoryPost = (data) => {
        this.setState({
            category:data
        })
    }

    updateSortType = (type) => {
        this.setState({
            field:type,
            [type] : !this.state[type]
        })
    }

    filterdPost = () => {
        return this.props.posts.filter(item => item.category == this.state.category)
    }

    sortPosts = (obj, type) => {
        return this.state[type] ? obj.sort((a, b) => b[type] > a[type]) :  obj.sort((a, b) => b[type] < a[type])
    }

    render() {
        let posts =  this.state.category==='all' ? this.props.posts : this.filterdPost();
        posts = this.state.field === ''? posts : this.sortPosts(posts, this.state.field)
        return (
            <div className="container">
                <div>
                    <h4>Select Category</h4>
                    <Form>
                        <FormGroup>
                            <Input type="select" name="category" onChange={(evt) => this.getCategoryPost(evt.target.value)} value={this.state.category}>
                                <option value = "all">All</option>
                                {this.renderCategories()}
                            </Input>
                        </FormGroup>
                    </Form>
                </div>
                <PostList 
                    postList={posts}
                    sortPosts={(type) => this.updateSortType(type)} 
                    deletePosts={(id)=>this.deletePostHandler(id)} />
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{    
        categories:state.postReducer.categories,
        posts:state.postReducer.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getCategory:()=>dispatch(actionType.category()),
        getPosts:()=>dispatch(actionType.getPost()),
        deletePosts:(id)=>dispatch(actionType.deletePost(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
