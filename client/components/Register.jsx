import React from 'react'
import { connect } from 'react-redux'
import { registerUserRequest } from '../actions/register'
import { loginError } from '../actions/login'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      user_name: '',
      email_address: '',
      password: '',
      confirm_password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateDetails(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  submit(e) {
    e.preventDefault()
    e.target.reset()
    let { password, confirm_password } = this.state
    if (confirm_password != password) return this.props.dispatch(loginError("Passwords don't match"))
    this.props.dispatch(registerUserRequest(this.state))
  }

  render() {
    const { auth } = this.props
    return (
      <div className='section'>
        <div className='columns is-centered'>
          <div className='column is-4'>

            <form className="form" onSubmit={this.submit}>
              <h1 className="title is-1 has-text-centered">Register</h1>
              {auth.errorMessage
                && <p className="has-text-danger is-large has-text-centered">{auth.errorMessage}</p>}
              <hr />

              <label className="label is-large">Username
                <input required className="input is-large is-fullwidth" placeholder="Username" type="text" name="user_name" onChange={this.updateDetails} />
              </label>

              <label className="label is-large">Name
                <div className='columns'>
                  <div className='column is-6'>
                    <input required className="input is-large is-fullwidth" placeholder="First Name" type="text" name="first_name" onChange={this.updateDetails} />
                  </div>
                  <div className='column is-6'>
                    <input required className="input is-large is-fullwidth" placeholder="Last Name" type="text" name="last_name" onChange={this.updateDetails} />
                  </div>
                </div>
              </label>

              <label className="label is-large">Email Address
                <input required className="input is-large is-fullwidth" placeholder="Email Address" type="email" name="email_address" onChange={this.updateDetails} />
              </label>

              <div className='columns'>
                <div className='column is-6'>
                  <label className="label is-large">Password
                <input required className="input is-large is-fullwidth" placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
                  </label>
                </div>
                <div className='column is-6'>
                  <label className="label is-large">Confirm Password
                <input required className="input is-large is-fullwidth" placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.updateDetails} />
                  </label>
                </div>
              </div>
              <p className='is-small has-text-centered'>Already have an account? <Link to='/login'>Login here</Link></p>

              <hr />
              <input className="submit button is-centered is-black is-large" value='Register' type="submit" />
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

export default connect(mapStateToProps)(Register)
