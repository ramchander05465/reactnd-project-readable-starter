import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {category} from '../actions';
import Header from '../components/header';
import Routes from '../routes';

class App extends Component {

  componentDidMount = () => {
    this.props.getCategory();
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

const mapDispatchToProps = (dispatch) => {
  return{
    getCategory:()=>dispatch(category())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));