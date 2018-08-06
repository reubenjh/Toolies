import React from 'react'
import { connect } from 'react-redux'

import GearEdit from './GearEdit'
import GearRequest from './GearRequest'
import ToolTip from './ToolTip'

export class GearItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editingItem: false,
            requestingItem: false,
            requestSent: false,
            activeToolTip: null,
            toolTipOpen: false
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.closeRequest = this.closeRequest.bind(this)
        this.openRequest = this.openRequest.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
        this.openToolTip = this.openToolTip.bind(this)
        this.closeToolTip = this.closeToolTip.bind(this)
    }

    toLogin() {
        document.location = "/#/login"
    }

    openToolTip(trustframework) {
        this.setState({
            activeToolTip: trustframework,
            toolTipOpen: true
        })
    }

    closeToolTip() {
        this.setState({
            activeToolTip: null,
            toolTipOpen: false
        })
    }

    openEdit() {
        this.setState({
            editingItem: true
        })
    }

    closeEdit() {
        this.setState({
            editingItem: false
        })
    }

    openRequest() {
        this.setState({
            requestingItem: true
        })
    }

    closeRequest() {
        this.setState({
            requestingItem: false
        })
    }

    sendRequest() {
        this.setState({
            requestingItem: false,
            requestSent: true
        })
    }


    render() {
        const gearId = Number(this.props.match.params.id)

        // to wait on gear array & user info load:
        if (this.props.gear.isFetching || this.props.user.isFetching) {
            return (
                <p>Fetching!!!!!!!!!!!</p>
            )
        }

        // once loaded:
        else {
            const thisGear = this.props.gear.gear.find((i) => i.id === gearId)
            const {
                name,
                description,
                status,
                photo_url,
                trustframework,
                user_id,
                user_name
            } = thisGear
            const activeUserId = this.props.user.id
            const gearOwnerId = user_id

            return (
                <div className='section'>
                    <div className='container'>
                        <div className='columns is-centered'>
                            <div className='column is-9'>
                                <div className='columns is-multiline has-text-centered'>
                                    <div className='column is-12'>
                                        <h1 className='title is-1'>{name}</h1>
                                    </div>

                                    <div className='column is-12'>
                                        <p>@{user_name}</p>
                                    </div>
                                </div>
                                <div className='columns box gear-card'>
                                    <div className='column is-7'>
                                        <h3 className='title is-3'>Description:</h3>
                                        <p>{description}</p>
                                        <br />
                                        <h5 className='title is-5' id='is-gear-item-subcategory1'>{status}</h5>
                                        <br />
                                        <h5 className='title is-5' id='is-gear-item-subcategory2'>Borrowing conditions:</h5>
                                        <p><a onClick={() => this.openToolTip(trustframework)}>{(trustframework == 'One')
                                            ? 'Free Borrowing'
                                            : (trustframework == 'Two')
                                                ? 'Upkeep Koha'
                                                : 'Conditional (Contact Owner)'
                                        }</a></p>
                                        <br />

                                    </div>
                                    <div className='column is-5'>
                                        <img className="gearitemimg is-pulled-right" src={photo_url} />
                                    </div>
                                </div>

                                <div className='columns is-multiline is-centered'>
                                    <div className='column is-12'>
                                        {!this.props.auth.isAuthenticated
                                            && <p className='has-text-centered'>Only registered users can request to borrow gear</p>}

                                        {this.props.auth.isAuthenticated && activeUserId === gearOwnerId && !this.state.editingItem
                                            && <p className='has-text-centered'>This is your tool</p>}

                                        {this.props.auth.isAuthenticated && activeUserId !== gearOwnerId
                                            && <p className='has-text-centered'>Far out, nice tool. Want to use it? Get in touch</p>}
                                    </div>
                                    <div className='column is-6'>

                                        {!this.props.auth.isAuthenticated
                                            && <button className='submit button is-centered is-black is-large' onClick={this.toLogin}>Login/Register</button>}

                                        {this.props.auth.isAuthenticated && activeUserId === gearOwnerId && !this.state.editingItem
                                            && <button className='submit button is-centered is-black is-large' onClick={() => this.openEdit()}>Edit this tool</button>}

                                        {this.props.auth.isAuthenticated && activeUserId !== gearOwnerId && !this.state.requestSent
                                            && <button className='submit button is-centered is-black is-large' onClick={() => this.openRequest()}>Request this tool</button>}
                                        {this.props.auth.isAuthenticated && activeUserId !== gearOwnerId && this.state.requestSent
                                            && <p className='has-text-centered'>Message sent!</p>}
                                    </div>
                                </div>




                                <div className={`modal ${this.state.toolTipOpen && this.state.activeToolTip == 'One' && 'is-active'}`}>
                                    <div className="modal-background"></div>
                                    <div className="modal-content">
                                        <ToolTip trustframework={trustframework} />}
                            </div>
                                    <a className="submit button is-centered is-large modal-close" aria-label="close" onClick={() => this.closeToolTip()}></a>
                                </div>

                                <div className={`modal ${this.state.toolTipOpen && this.state.activeToolTip == 'Two' && 'is-active'}`}>
                                    <div className="modal-background"></div>
                                    <div className="modal-content">
                                        <ToolTip trustframework={trustframework} />}
                            </div>
                                    <a className="submit button is-centered is-large modal-close" aria-label="close" onClick={() => this.closeToolTip()}></a>
                                </div>

                                <div className={`modal ${this.state.toolTipOpen && this.state.activeToolTip == 'Three' && 'is-active'}`}>
                                    <div className="modal-background"></div>
                                    <div className="modal-content">
                                        <ToolTip trustframework={trustframework} />}
                            </div>
                                    <a className="submit button is-centered is-large modal-close" aria-label="close" onClick={() => this.closeToolTip()}></a>
                                </div>




                                <div className={`modal ${this.state.editingItem && 'is-active'}`}>
                                    <div className="modal-background"></div>
                                    <div className="modal-content">
                                        <GearEdit item={thisGear} onFinish={() => this.closeEdit()} />}
                            </div>
                                    <a className="submit button is-centered is-large modal-close" aria-label="close" onClick={() => this.closeEdit()}></a>
                                </div>

                                <div className={`modal ${this.state.requestingItem && 'is-active'}`}>
                                    <div className="modal-background"></div>
                                    <div className="modal-content">
                                        <GearRequest onFinish={() => this.sendRequest()} gear_id={gearId} owner_id={gearOwnerId} requester_id={activeUserId} name={name} />}
                            </div>
                                    <a className="submit button is-centered is-large modal-close" aria-label="close" onClick={() => this.closeRequest()}></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => (
    {
        auth: state.auth,
        user: state.user,
        gear: state.gear
    }
)
export default connect(mapStateToProps)(GearItem)