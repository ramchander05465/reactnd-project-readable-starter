import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import CreatePost from './containers/createPost.js';
import Posts from './containers/posts';
import PostDetails from './containers/postDetails';
import Category from './containers/category';
import Error from './components/error';

const routes = (props) => (
    <main>
        <Switch>
            <Route path="/posts" component={Posts} />            
            <Route path="/create" component={CreatePost} />
            <Route path="/edit" component={CreatePost} />
            <Route path="/:category/:postId" exact component={PostDetails} />
            <Route path="/:category(react|redux|udacity)" component={Category} /> 
            <Route path="/error" component={Error} /> 
            <Redirect from="" to="/posts" />
        </Switch>
    </main>
)

export default routes;