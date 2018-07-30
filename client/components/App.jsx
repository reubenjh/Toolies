import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Profile from './Profile'
import ToolPool from './ToolPool'
import GearItem from './GearItem'
import Home from './Home'

import { getGear } from "../actions/gear";
import { fetchUser } from '../actions/login'



class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(getGear())
    this.props.auth.isAuthenticated && this.props.dispatch(fetchUser())
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={Nav} />
          <Route exact path='/' component={Home} />
          <Route exact path='/toolpool' component={ToolPool} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/item/:id' component={GearItem} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
