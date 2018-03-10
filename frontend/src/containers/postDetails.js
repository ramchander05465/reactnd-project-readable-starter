import React, { Component } from 'react';
import uuid from 'uuid';
import {voteOnPost} from '../actions/postCommand'
import {addComment,getComments, editComments,deleteComments,voteOnComment} from '../actions/commentCommand';
import {connect} from 'react-redux';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {FaEdit, FaTrash, FaThumbsOUp, FaThumbsODown} from 'react-icons/lib/fa';
import {Link} from 'react-router-dom';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

class PostDetails extends Component {
    post;
    postId;
    times;
    commentForEdit;
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
    
    componentWillMount = () => {
        this.post = this.props.posts.filter(data => data.id === this.postId);
        this.post = this.post.length > 0 ? this.post[0] : this.props.history.push("/error");
        this.times = this.post === undefined ? '' : new Date(this.post.timestamp).toISOString();
    } 
    
    notify = (status) => {     
        return this.toastId = toast(status, { autoClose: true });
    }
    
    componentDidMount = () => {
        if(!this.post) return;
        this.props.getComments(this.post.id);
    }

    addCommentHandler = () => {
        if(this.state.body===''){
            this.notify('Please enter comment');
            return;
        }

        if(!this.state.editMode){
            let commentDetails = {
                id:uuid.v4(),
                timestamp:Date.now(),
                body:this.state.body,
                author:this.state.author,
                parentId:this.post.id
            }
    
            this.props.addComment(commentDetails).then(res => this.notify('Comment has been saved successfully'))

        }else{
            let comment = {
                id:this.state.commentID,
                timestamp:Date.now(),
                body:this.state.body,
                author:this.state.author
            } 
            this.props.editComments(comment).then(res => this.notify('Comment has updated successfully'));           
        }
        this.setState({
            editMode:false,
            author:'',
            body:'',
            commentID:null
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
            editMode:false,
            author:'',
            body:'',
            commentID:null
        }) 
    }

    editCommentsHandler = (comment) => {
        this.setState({
            ...this.state,
            editMode:true,
            author:comment.author,
            body:comment.body,
            commentID:comment.id
        })
    }

    deleteCommentHandler = (id) => {
        this.props.deleteComments(id).then(res => this.notify('Comment has been deleted successfully'));
    }

    voteOnPost = (vote) => {
        this.props.voteOnPost(vote,this.post.id).then(res => this.notify('Vote has been given successfully'));
    }

    voteOnComment = (vote, id) => {
        this.props.voteOnComment(vote,id).then(res => this.notify('Vote has been given successfully'))
    }

    renderComments = () => {
        if(!this.props.comments) return; 
        return this.props.comments.map(item => <div key={item.id}><hr />
            <div>{item.body}</div>
            <div>{item.author}</div>
            <div>
                <FaEdit className="icon" onClick={() => this.editCommentsHandler(item)} />
                <FaTrash className="icon" onClick={() => this.deleteCommentHandler(item.id)} />
                <FaThumbsOUp className="icon" onClick={() => this.voteOnComment('upVote', item.id)} />
                [{item.voteScore}]
                <FaThumbsODown className="icon" onClick={() => this.voteOnComment('downVote', item.id)} />
            </div>                
        </div>)
    }

    renderPost = () => {
        return(
            <div>
                <div><b>Title : </b> {this.post.title}</div>
                <div>{this.post.body}</div>
                <div>
                    <b>author : </b> {this.post.author} [{this.times}]
                    <FaThumbsOUp className="icon" onClick={() => this.voteOnPost('upVote')} />
                    {this.post.voteScore}
                    <FaThumbsODown className="icon" onClick={() => this.voteOnPost('downVote')} />
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
                {this.post ? this.renderPost() : null}
                <div>
                   {this.renderComments()} 
                </div>
                <hr />
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
    voteOnPost,
    addComment,
    getComments,
    editComments,
    deleteComments,
    voteOnComment

})(PostDetails);