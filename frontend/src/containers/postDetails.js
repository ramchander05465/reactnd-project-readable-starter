import React, { Component } from 'react';
import uuid from 'uuid';
import { getPostById, voteOnPost, deletePost} from '../actions/postCommand'
import {addComment,getComments, editComments,deleteComments,voteOnComment} from '../actions/commentCommand';
import {connect} from 'react-redux';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import Post from '../components/post';

import Comment from '../components/comment'

class PostDetails extends Component {
    post;
    postId;
    times;
    commentForEdit;
    isDeleted=false;
    constructor(props){
        super(props);
        this.postId = this.props.match.params.postId;
    }

    state = {
        editMode : false,
        author : '',
        body : '',
        commentID : null
    }
        
    notify = (status) => {     
        return this.toastId = toast(status, { autoClose: true });
    }

    componentDidMount = () => {        
        this.props.getComments(this.postId);
    }

    voteOnPost = (vote) => {
        this.props.voteOnPost(vote,this.postId)
            .then(res => this.notify('Vote has been given successfully'));
    }

    deletePostHandler = () => {
        this.props.deletePost(this.postId).then(
            this.isDeleted = true
        )
    }

    addCommentHandler = () => {
        if(this.state.body===''){
            this.notify('Please enter comment');
            return;
        }

        if(!this.state.editMode){
            let commentDetails = {
                id : uuid.v4(),
                timestamp : Date.now(),
                body : this.state.body,
                author : this.state.author,
                parentId : this.postId
            }
    
            this.props.addComment(commentDetails).then(res => this.notify('Comment has been saved successfully'))

        }else{
            let comment = {
                id : this.state.commentID,
                timestamp : Date.now(),
                body : this.state.body,
                author : this.state.author
            } 
            this.props.editComments(comment).then(res => this.notify('Comment has updated successfully'));           
        }

        this.setState({
            editMode : false,
            author : '',
            body : '',
            commentID : null
        })    
    }

    onChangeHandler = (evt) => {
        this.setState({
            ...this.state,
            [evt.target.name]:evt.target.value
        })
    }

    resetForm = () => {
        this.setState({
            editMode : false,
            author : '',
            body : '',
            commentID : null
        }) 
    }

    editCommentsHandler = (comment) => {
        this.setState({
            ...this.state,
            editMode : true,
            author : comment.author,
            body : comment.body,
            commentID : comment.id
        })
    }

    deleteCommentHandler = (id) => {
        this.props.deleteComments(id).then(res => this.notify('Comment has been deleted successfully'));
    }

    voteOnComment = (vote, id) => {
        this.props.voteOnComment(vote,id).then(res => this.notify('Vote has been given successfully'))
    }

    renderPost = () => {
        let selectedPost = this.props.posts.filter(post => post.id === this.postId);
        return(
            <Post 
                info={selectedPost[0]}
                deletePostHandler = {this.deletePostHandler}
                voteOnPost = {this.voteOnPost} />
        )
    }

    renderComments = () => {
        return this.props.comments.map(item => <Comment 
            key={item.id}
            info={item} 
            deleteCommentHandler={this.deleteCommentHandler}
            voteOnComment={this.voteOnComment}
            editCommentsHandler={this.editCommentsHandler} />)
    }

    renderCommentForm = () => {
        let selectedPost = this.props.posts.filter(post => post.id === this.postId);
        if(selectedPost.length === 0) return        
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Input type="textarea" 
                            name="body"
                            onChange={(evt) => this.onChangeHandler(evt)} 
                            value={this.state.body} 
                            placeholder="Comment" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                            name="author" 
                            onChange={(evt) => this.onChangeHandler(evt)}  
                            value={this.state.author} 
                            placeholder="Author Name"
                            disabled = {this.state.editMode ? true:false} />
                    </FormGroup>                     
                </Form>                        
                <div>
                    <Button onClick={() => this.addCommentHandler()}>Save</Button>
                    {this.state.editMode ? <Button onClick={() => this.resetForm()}>Cancel</Button>: null}
                </div>
            </div>
        )
    }
        
    render() {  
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Posts</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Post Details</BreadcrumbItem>
                </Breadcrumb>
                {this.isDeleted ? <h3>Post Deleted</h3> : this.renderPost()}
                {this.isDeleted ? '' : this.renderComments()}
                {this.isDeleted ? '' : this.renderCommentForm()}
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = ({commentReducer, postReducer}) => {
    return {
        comments : commentReducer.comments,
        posts : postReducer.posts
    }
}

export default connect(mapStateToProps, {
    getPostById,
    voteOnPost,
    deletePost,
    addComment,
    getComments,
    editComments,
    deleteComments,
    voteOnComment
})(PostDetails);