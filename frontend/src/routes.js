import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import CreatePost from './containers/createPost.js';
import Posts from './containers/posts';
import PostDetails from './containers/postDetails';

const routes = (props) => (
    <main>
        <Switch>
            <Route path="/posts" component={Posts} />
            <Route path="/create" component={CreatePost} />
            <Route path="/edit" component={CreatePost} />
            <Route path="/postdetails" component={PostDetails} />
            <Redirect from="" to="/posts" />
        </Switch>
    </main>
)

export default routes;