import React, { Component } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addPost, editPost } from '../actions/postCommand';

class CreatePost extends Component {
    constructor(props){
        super(props)
        let {location} = props;
        let post = location.state ? location.state : null;
        
        this.state = {
            id: post ? post.id : uuid.v4(),
            title : post ? post.title :'',
            body : post ? post.body :'',
            author : post ? post.author :'',
            category : post ? post.category :'',
            editMode : location.pathname === '/edit'
        }
    }

    notify = (status) => {     
        return this.toastId = toast(status, { autoClose: true });
    }

    resetSateValue = () => {
        this.setState(
            {
                id: uuid.v4(),
                title : '',
                body : '',
                author : '',
                category : ''
            }
        )
    }
    
    renderCategory = () => {
        return this.props.categories.map(category => <option key={category.name}>{category.name}</option>)
    }

    onChangeHandler = (evt) => {
        this.setState({
            ...this.state,
            [evt.target.name]:evt.target.value
        })
    }

    postDetails = () => {
        if(this.state.title===''){
            this.notify('Please enter post title');
            return;
        }
        let post = {...this.state, timestamp:Date.now()};
        this.props.addPost(post)
            .then(res => this.notify('Post has been saved successfully'))
            .then(data => this.resetSateValue());
    }

    editPost = () => {
        if(this.state.title===''){
            this.notify('Please enter post title');
            return;
        }
        let post = {
            title:this.state.title,
            body:this.state.body
        };
        this.props.editPost(this.state.id, post)
            .then(res => this.notify('Post has been saved successfully'))
            .then(data => this.resetSateValue());
    }

    renderBreadcrumb = () => {
        return(
            <Breadcrumb>
                <BreadcrumbItem><Link to="/">Posts</Link></BreadcrumbItem>
                <BreadcrumbItem active>Post Details</BreadcrumbItem>
            </Breadcrumb>
        )
    }

    render() {
        return (
            <div className="container">
                {this.state.editMode ? this.renderBreadcrumb() : null}                
                <h3>{this.state.editMode ? 'Edit Post':'Create New Post'}</h3>
                <hr />
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" 
                            name="title" 
                            id="title" 
                            value={this.state.title} 
                            placeholder="Post Title"
                            onChange={(evt) => this.onChangeHandler(evt)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" 
                            name="body" 
                            id="body" 
                            value={this.state.body} 
                            placeholder="Post body content"
                            onChange={(evt) => this.onChangeHandler(evt)} />
                    </FormGroup>  
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" 
                            name="author" 
                            id="author" 
                            value={this.state.author} 
                            placeholder="author"
                            onChange={(evt) => this.onChangeHandler(evt)} />
                    </FormGroup>              
                    <FormGroup>
                        <Label for="author">Select Category</Label>
                        <Input type="select" name="category" onChange={(evt) => this.onChangeHandler(evt)} value={this.state.category}>
                            <option value = "all">All</option>
                            {this.renderCategory()}
                        </Input>
                    </FormGroup>              
                    {this.editMode ? <Button onClick={()=>this.editPost()}>Update</Button> : <Button onClick={()=>this.postDetails()}>Submit</Button>}
                </Form>
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = ({postReducer}) => {
    return {
        categories : postReducer.categories
    }
}

export default connect(mapStateToProps, {addPost, editPost})(CreatePost);