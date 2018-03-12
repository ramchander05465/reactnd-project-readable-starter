import React from 'react';
import {FaEdit, FaTrash, FaThumbsOUp, FaThumbsODown} from 'react-icons/lib/fa';
import {Link} from 'react-router-dom';

const post = (props) => {
    return(
        <div>
            <div><b>Title : </b> {props.info.title}</div>
            <div><b>Description : </b>{props.info.body}</div>
            <div><b>author : </b>{props.info.author}</div>
            <div><b>Number of comments : </b>{props.info.commentCount}</div>
            <div><b>Current score : </b>{props.info.voteScore}</div>
            <div>
                <Link className="link" to={{pathname:'/edit', state:props.info}}><FaEdit className="icon" /></Link>
                <FaTrash className="icon" onClick={() => props.deletePostHandler()} />
                <FaThumbsOUp className="icon" onClick={() => props.voteOnPost('upVote', props.info.id)} />
                <FaThumbsODown className="icon" onClick={() => props.voteOnPost('downVote', props.info.id)} />
            </div>    
        </div>
    )
}

export default post;