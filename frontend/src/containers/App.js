import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { category, getPost } from '../actions/postCommand';
import Header from '../components/header';
import Routes from '../routes';

class App extends Component {

  componentDidMount = () => {
    this.props.getPost()
      .then(res => this.props.category());    
  }
  
  render() {
    return (
      <div>
        <Header />
        <Routes />
      </div>
    );
  }
}

export default withRouter(connect(null, {category, getPost})(App));