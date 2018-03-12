import React from 'react';
import {FaEdit, FaTrash, FaThumbsOUp, FaThumbsODown} from 'react-icons/lib/fa';

const comment = (props) => {
    return(
        <div key={props.info.id}><hr />
            <div><b>Comment</b> :{props.info.body}</div>
            <div><b>Author</b> : {props.info.author}</div>
            <div><b>Current score</b> : {props.info.voteScore}</div>
            <div>
                <FaEdit className="icon" onClick={() => props.editCommentsHandler(props.info)} />
                <FaTrash className="icon" onClick={() => props.deleteCommentHandler(props.info.id)} />
                <FaThumbsOUp className="icon" onClick={() => props.voteOnComment('upVote', props.info.id)} />
                <FaThumbsODown className="icon" onClick={() => props.voteOnComment('downVote', props.info.id)} />
            </div> 
             
            <hr />               
        </div>
    )
}

export default comment;