import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from './Home'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { authedUser } = this.props
    return (
      <div>
        {authedUser === null ?
          <Login /> :
          <Home />}
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleInitialData })(App);
