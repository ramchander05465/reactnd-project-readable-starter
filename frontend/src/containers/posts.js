import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { category, deletePost, voteOnPost } from '../actions/postCommand';
import PostList from '../components/postList';
import { ToastContainer, toast } from 'react-toastify';

class Posts extends Component {

    state = {
        field:'',
        voteScore:true,
        timestamp:true
    }
   
    notify = (status) => {     
        return this.toastId = toast(status, { autoClose: true });
    }

    renderCategories = () =>{
        return this.props.categories.map(category => (<span className="category" key={category.name}>
            <Link to={`/${category.name}`}>{category.name}</Link></span>))
    }

    deletePostHandler = (id) => {
        this.props.deletePost(id)
            .then(res => this.notify('Post has been delete successfully'));
    }

    updateSortType = (type) => {
        this.setState({
            field:type,
            [type] : !this.state[type]
        })
    }

    sortPosts = (obj, type) => {
        return this.state[type] ? obj.sort((a, b) => b[type] > a[type]) :  obj.sort((a, b) => b[type] < a[type])
    }

    voteOnPost = (vote, postId) => {
        this.props.voteOnPost(vote,postId).then(res => this.notify('Vote has been given successfully'));
    }

    render() {
        let posts = this.state.field === ''? this.props.posts : this.sortPosts(this.props.posts, this.state.field)
        return (
            <div className="container">
                <div>
                    <h4>Select Category</h4>
                    {this.renderCategories()}
                </div>
                <PostList 
                    postList = {posts}
                    sortPosts = {(type) => this.updateSortType(type)}
                    voteOnPost = {(vote, postId) => this.voteOnPost(vote, postId)} 
                    deletePosts={(id)=>this.deletePostHandler(id)} />
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = ({postReducer}) => {
    return{    
        categories : postReducer.categories,
        posts : postReducer.posts
    }
}

export default connect(mapStateToProps, {category, deletePost, voteOnPost})(Posts);