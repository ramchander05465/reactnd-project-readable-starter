import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deletePost, voteOnPost} from '../actions/postCommand';
import { ToastContainer, toast } from 'react-toastify';
import PostList from '../components/postList';
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

class Category extends Component {
    category;
    posts; 
    constructor(props){
        super(props)
        this.category = props.match.params.category;
    }

    state = {
        field:'',
        voteScore:true,
        timestamp:true
    }

    notify = (status) => {     
        return this.toastId = toast(status, { autoClose: true });
    }

    updateSortType = (type) => {
        this.setState({
            field:type,
            [type] : !this.state[type]
        })
    }

    deletePostHandler = (id) => {
        this.props.deletePosts(id)
            .then(res => this.notify('Post has been delete successfully'));
    }

    voteOnPost = (vote, id) => {
        this.props.voteOnPost(vote, id)
            .then(res => this.notify('Vote has been given successfully'));
    }

    filterdPost = () => {
        return this.props.categoryPosts.filter(post => post.category === this.category );
    }

    sortPosts = (obj, type) => {
        return this.state[type] ? obj.sort((a, b) => b[type] > a[type]) :  obj.sort((a, b) => b[type] < a[type])
    }

    render() {
        this.posts = this.state.field === '' ? this.filterdPost() : this.sortPosts(this.filterdPost(), this.state.field)
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.category}</BreadcrumbItem>
                </Breadcrumb>
                {this.posts.length > 0 ? <PostList 
                    postList={this.posts}
                    sortPosts={(category) => this.updateSortType(category)} 
                    voteOnPost = {(vote, id) => this.voteOnPost(vote, id)}
                    deletePosts={(id)=>this.deletePostHandler(id)} />:<h3>No Records</h3>}
                <ToastContainer />
            </div>
        );
    }
}

function mapStateToProps({postReducer}) {
    return {
        categoryPosts : postReducer.posts
    };
}

export default connect(mapStateToProps, {deletePost, voteOnPost})(Category);