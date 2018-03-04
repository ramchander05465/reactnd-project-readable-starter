const apiURL = 'http://localhost:3001/';
let token = localStorage.getItem('token');

if(!token) {
    token = localStorage.setItem('token',Math.random().toString(36).substr(-8));
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
  }

export const fetchCategories = () => 
    fetch(apiURL+'categories', {headers})
        .then(res => res.json())
        .then(data => data.categories)

export const fetchPosts = () => 
    fetch(apiURL+'posts', {headers})
        .then(res => res.json())
        .then(data => data)

export const addNewPost = (postDetails) => {
    console.log(postDetails)
    return fetch(apiURL+'posts', {method:'POST', headers, body:JSON.stringify(postDetails)})
    .then(res => res.json())
    .then(data => data)
} 

export const deletePosts = (id) =>
    fetch(apiURL+'posts/'+id, {method:'DELETE', headers})
        .then(res => res.json())
        .then(data => data)

export const voteOnPost = (vote, id) => 
    fetch(`${apiURL}posts/${id}`, {method:'POST', headers, body:JSON.stringify({option:vote})})
        .then(res => res.json())
        .then(data => data)

export const addComments = (comments) => 
    fetch(apiURL+'comments', {method:'POST', headers, body:JSON.stringify(comments)})
        .then(res => res.json())
        .then(data => data)

export const getComments = (id) => 
    fetch(`${apiURL}posts/${id}/comments`, {headers})
        .then(res => res.json())
        .then(data => data)

export const editComments = (data) => 
    fetch(`${apiURL}comments/${data.id}`, {method:'PUT', headers, body:JSON.stringify(data)})
        .then(res => res.json())
        .then(data => data)

export const deleteComments = (id) => 
    fetch(`${apiURL}comments/${id}`, {method: 'DELETE', headers})
        .then(res => res.json())
        .then(data => data)

export const voteOnComments = (vote, id) =>
    fetch(`${apiURL}comments/${id}`, {method:'POST', headers, body:JSON.stringify({option:vote})})
        .then(res => res.json())
        .then(data => data)