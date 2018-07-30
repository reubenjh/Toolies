import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/logout'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {
    console.log("path",this.props.location.pathname);
    return (
      <div className='section' id='navbar'>
        <div className='columns is-centered has-text-centered navLink'>
          <div className='column is-3'>
            <p><Link className={this.props.location.pathname === "/toolpool" ? 'active' : ""} to="/toolpool">Browse</Link></p>
          </div>
          <div className='column is-6'>
            <h1 className={this.props.location.pathname === "/login" ? 'active title is-3' : "title is-3"}><Link to="/">Nuts & Bolts</Link></h1>
          </div>
          <div className='column is-3'>
            {this.props.auth.isAuthenticated
              ? [
                <div>
                <Link className={this.props.location.pathname === "/profile" ? 'active' : ""} to="/profile">My Account</Link>
                <Link className='navSpace' to="/" onClick={this.props.logout}>Logout</Link>
                </div>
                ]
                : [
                  <Link className={this.props.location.pathname === "/login" ? 'active' : ""} to='/login'>Login</Link>
                ]
              }
          </div>
          </div>
          <hr/>
        </div>
      )
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logoutUser())
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Nav)
