import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/login'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateDetails(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit(e) {
    e.preventDefault()
    let { user_name, password } = this.state
    this.props.dispatch(loginUser({ user_name, password }))
  }

  render() {
    const { auth } = this.props

    return (
      <div className='section'>
        <div className='columns is-centered'>
          <div className='column is-4'>

            <form className='form' onSubmit={this.submit}>
              <h1 className="title is-1 has-text-centered">Login</h1>
              {auth.errorMessage
                && <p className="has-text-danger is-large has-text-centered">{auth.errorMessage}</p>}
              <hr />

              <label className="label is-large">Username
                <input required className="input is-large is-fullwidth" placeholder="Username" type="text" name="user_name" onChange={this.updateDetails} />
              </label>

              <label className="label is-large">Password
                <input required className="input is-large is-fullwidth" placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
              </label>
              <p className='is-small has-text-centered'>Don't have an account? <Link to='/register'>Create an account here</Link></p>

              <hr />
              <input className="submit button is-centered is-black is-large" value='Login' type="submit" />
            </form>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Login)
