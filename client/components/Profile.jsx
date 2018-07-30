import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import GearList from './GearList'
import NewGearForm from './NewGearForm'
import EditProfileForm from './EditProfileForm'
import StarRatingComponent from 'react-star-rating-component';

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addingItem: false,
      editingProfile: false,
      rating: 4,
      viewingProfile: true,
      viewingMessages: false
    }

    this.setFalse = this.setFalse.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  componentDidMount() {
    !this.props.auth.isAuthenticated && (document.location = "/#/login")
  }


  setFalse(val) {
    this.setState({
      [val]: false
    })
  }

  renderForm(ref) {
    this.setState({
      [ref]: true
    })
  }

  selectProfile() {
    this.setState({
      viewingProfile: true,
      viewingMessages: false
    })
  }

  selectMessages() {
    this.setState({
      viewingProfile: false,
      viewingMessages: true
    })
  }

  render() {
    // to wait on gear array & user info load:
    if (this.props.user.isFetching) {
      return (
        <div className="container">
          <p className="has-text-centered title is-1"> Fetching...</p>

        </div>
      )
    }

    // once loaded:
    else {
      return (
        <div className='container'>
          {this.props.user.message && <span className="has-text-danger is-large">{this.props.user.message}</span>}

          <div className='section profile'>

            <div className='columns is-multiline'>
              <div className='column is-5'>
                <img className='profile-photo' src={this.props.user.profilePic} />
              </div>

              <div className='column is-6 is-offset-1'>
                <div className='columns is-multiline'>
                  <div className='column is-12'>
                    <div className="tabs is-boxed is-right profile-tab">
                      <ul>
                        <li className={`${this.state.viewingMessages && 'is-active'}`}
                          onClick={() => this.selectMessages()}>
                          <a>My Messages</a>
                        </li>
                        <li className={`${this.state.viewingProfile && 'is-active'}`}
                          onClick={() => this.selectProfile()}>
                          <a>Profile</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {
                    this.state.viewingProfile

                      ?

                        <div className='column is-12 is-full'>
                          <h1 className='title is-1'>@{this.props.user.username}</h1>
                          <h5 className='title is-5' id='name'>{this.props.user.firstName} {this.props.user.lastName}</h5>
                          <p>{this.props.user.email}</p>
                          <p className='rating'>Trust Rating: </p>
                          <span className='rating'><StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={this.hoverRating || this.rating}
                            onStarClick={this.rate}
                            onStarHover={this.changeHoverRating}
                            onStarHoverOut={this.endHover}
                            starColor='gold'
                          />
                          </span>
                          <br />

                          {!this.state.editingProfile && !this.state.addingItem
                            && <a className='button button-pad' onClick={() => this.renderForm('editingProfile')}>Edit Profile</a>}
                        </div>

                      :

                        <div className='column is-12'>
                          <h1 className='title is-1'>Messages</h1>
                          <div>
                          <ul>
                            {this.props.user.messages.received.map(message => {
                              return (
                                <div className='message'>
                                  <i className="far fa-envelope icon-pad"></i>
                                  <span>{message.requester_user_name}</span>
                                  <span className='is-pulled-right'>{message.created_at}</span>
                                  <li>{message.message}</li>
                                  <p>
                                    <Link to={`/item/${message.gear_id}`}>
                                      {message.gear_name}
                                    </Link>
                                  </p>
                                </div>
                              )
                            })}
                          </ul>
                          </div>
                        </div>
                  }

                </div>
              </div>
            </div>





            <div className='profile-gear'>
              <div className='level'>
                <div className='level-left'>
                  <div className='level-item'>
                    <h1 className='title is-1'>My Tools</h1>
                  </div>
                </div>
                <div className='level-right'>
                  <div className='level-item'>
                    {!this.state.addingItem && !this.state.editingProfile
                      && <button className='button is-black is-large button-pad' onClick={() => this.renderForm('addingItem')}>Add Tool</button>}
                  </div>
                </div>
              </div>
              <hr />

              <GearList />
            </div>

            <div ref='addingItem'>
              <div className={`modal ${this.state.addingItem && 'is-active'}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                  <NewGearForm onFinish={() => this.setFalse('addingItem')} />}
                </div>
                <a className="submit button is-centered is-large modal-close" aria-label="close" onClick={() => this.setFalse('addingItem')}></a>
              </div>
            </div>

            <div ref='editingProfile'>
              <div className={`modal ${this.state.editingProfile && 'is-active'}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                  <EditProfileForm onFinish={() => this.setFalse('editingProfile')} />
                </div>
                <a className="submit button is-centered is-large modal-close" aria-label="close" onClick={() => this.setFalse('editingProfile')}></a>
              </div>
            </div>
          </div>
        </div >
      )
    }
  }
}

const mapStateToProps = (state) => (
  {
    auth: state.auth,
    user: state.user
  }
)

export default connect(mapStateToProps)(Profile)