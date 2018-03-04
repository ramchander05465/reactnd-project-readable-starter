import React from 'react';
import {Link} from 'react-router-dom'
import { Table } from 'reactstrap';
import {FaEdit, FaFileTextO, FaTrash, FaThumbsOUp, FaThumbsODown} from 'react-icons/lib/fa';

const postList = (props) => {
    return(
        <Table striped bordered>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Title</th>
            <th onClick={() => props.sortPosts('voteScore')}>Vote</th>
            <th onClick={() => props.sortPosts('timestamp')}>Date</th>
            <th onClick={() => console.log('dddd')}>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.postList.map((post, index) => <tr key={post.id}>
            <th scope="row">{index}</th>
            <td>{post.title}</td>
            <td>{post.voteScore} {post.voteScore > 0 ? <FaThumbsOUp />:<FaThumbsODown /> } </td>
            <td>{new Date(post.timestamp).toISOString()}</td>
            <td>
              <Link className="link" to={{pathname:'/postdetails', state:post}}><FaFileTextO /> </Link>  
              <Link className="link" to={{pathname:'/edit', state:post}}><FaEdit /></Link> 
              <span  className="link" onClick={() => props.deletePosts(post.id)}> <FaTrash /></span> 
            </td>
        </tr>)}
        </tbody>
      </Table>
    )
}
export default postList;