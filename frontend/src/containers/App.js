import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/postCommand';
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

export default withRouter(connect(null, actions)(App));