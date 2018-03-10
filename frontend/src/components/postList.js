import React from 'react';
import {Link} from 'react-router-dom'
import { Table } from 'reactstrap';
import {FaEdit, FaFileTextO, FaTrash, FaThumbsOUp, FaThumbsODown} from 'react-icons/lib/fa';

const postList = (props) => {
    const renderList = () => {
      if(props.postList.length === 0) return;

      return props.postList.map((post, index) => <tr key={post.id}>
        <th scope="row">{post.title}</th>
        <td>{post.author}</td>
        <td>{post.commentCount}</td>
        <td>{post.voteScore}</td>
        <td>
          <span className="link" onClick={() => props.voteOnPost('upVote', post.id)}><FaThumbsOUp /></span> 
          <span className="link"><FaThumbsODown onClick={() => props.voteOnPost('downVote', post.id)} /></span>
        </td>
        <td>{new Date(post.timestamp).toISOString()}</td>
        <td>
          <Link className="link" to={`/${post.category}/${post.id}`}><FaFileTextO /> </Link>  
          <Link className="link" to={{pathname:'/edit', state:post}}><FaEdit /></Link> 
          <span className="link" onClick={() => props.deletePosts(post.id)}> <FaTrash /></span> 
        </td>
      </tr>)
    }

    return(
        <Table striped bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Comments</th>
            <th>Score</th>
            <th className="sortBy" onClick={() => props.sortPosts('voteScore')}>Vote</th>
            <th className="sortBy" onClick={() => props.sortPosts('timestamp')}>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {renderList()}
        </tbody>
      </Table>
    )
}
export default postList;